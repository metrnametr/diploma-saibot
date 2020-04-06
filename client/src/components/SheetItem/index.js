import React, { useState, useRef, useLayoutEffect } from 'react';
import { useDrop } from 'react-dnd';
// import { Table } from 'antd';
import update from 'immutability-helper';
import { DeleteOutlined, SelectOutlined } from '@ant-design/icons';
import DragTool from './DragTool';

import SheetHeading from '../SheetHeading';
import SheetParagraph from '../SheetParagraph';
import SheetTable from '../SheetTable';
import { DragTypes, SheetHeight } from '../../constants';
import { chooseHeight } from '../../tools';
import './style.scss';


const ControllerContainer = ({ deleteContent, onSelect, selected }) => {
    return (
        <div className="controller">
            <div className="controller-item">
                <DeleteOutlined className="btn-delete" onClick={deleteContent} />
            </div>
            <div className="controller-item">
                <SelectOutlined onClick={onSelect} className={`btn-select ${selected && 'active'}`} />
            </div>
        </div>
    )
}


const chooseTools = (type, colCount, rowCount, toggleElement, id) => {
    switch(type) {
        case DragTypes.TOOL_HEADING: 
            return ({ elId, style, text, toggleText }) => 
                (
                <SheetHeading
                    style={style}
                    toggleElement={toggleElement}
                    idItem={elId}
                    sheetId={id}
                    text={text}
                    toggleText={toggleText}
                />
                );
        case DragTypes.TOOL_PARAGRAPH: 
            return ({ style, text, elId, toggleText }) => (
                <SheetParagraph
                    style={style}
                    text={text}
                    toggleElement={toggleElement}
                    idSheet={id} 
                    idItem={elId}
                    toggleText={toggleText}
                />
            )
        case DragTypes.TOOL_TABLE: return () => <SheetTable colCount={colCount} rowCount={rowCount} toggleElement={toggleElement} id={id} />;
        default: return ''
    }
}

const SheetItem = (props) => { 
    const {
        id,
        addSheetContent,
        toggleElement,
        content,
        setContent,
        deleteSheetContent,
        toggleText,
        toggleSelectedContent
    } = props;
    const heightRef = useRef(null);

    const [height, setHeight] = useState(0);

    const [dragsSortIndex, setDragsIndex] = useState({});
    const [{ isOver }, drop] = useDrop({
        accept: [ ...Object.keys(DragTypes) ],
        drop: ({ type, colCount, rowCount }) => {
            if (type) {
                const addElemet = chooseTools(type, colCount, rowCount, toggleElement, id);

                if (chooseHeight(type, height, rowCount)) {
                    addSheetContent(id, addElemet)
                } else {
                    addSheetContent(id, addElemet, true, type, rowCount)
                }
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    useLayoutEffect(() => {
        if (heightRef.current) {
            const { children } = heightRef.current;
            const heightContents = [ ...children ].reduce((total, it) => total + it.clientHeight, 0);
            setHeight(heightContents);
        }
    }, [content])

    const moveCard = (dragIndex, hoverIndex) => {
        
        const dragItem = content[dragIndex];
        
        setDragsIndex({ dragIndex, hoverIndex });
        
        const item = {
            content
        }
        setContent(
          update(item, {
            content: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
            },
          }).content,
          id
        );
      }

    return (
        <div className={`sheet sheet${id}`} ref={drop} style={{ background: isOver ? '#eeeeee' : 'white', opacity: isOver ? .5 : 1 }}>
            <div ref={heightRef} style={{ position: 'relative' }}>
                {
                    content.map((it, i) => 
                            <DragTool  
                                key={it.id}
                                index={i}
                                id={it.id}
                                moveCard={moveCard}
                                newStyle={{ position: 'relative', border: it.selected ? '1px solid #1890ff' : '1px dashed gray' }}
                            >
                                {it.body && it.body({
                                    elId: it.id,
                                    style: { position: 'relative' },
                                    text: it.text,
                                    toggleText,
                                })}
                                <ControllerContainer selected={it.selected} onSelect={() => toggleSelectedContent(id, it.id)} key={it.id + 1} deleteContent={() => deleteSheetContent(id, it.id)} />
                            </DragTool>
                    )
                }
            </div>
        </div>
    )
}


export default SheetItem;