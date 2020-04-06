import React, { useState, useRef, useEffect } from 'react';
import SheetItem from '../../components/SheetItem';

import { ToolParagraph, ToolHeading, ToolTable } from '../../components/ToolsDocPage';
import { Button, Tooltip, Affix } from 'antd';

import {
    PlusOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined
} from '@ant-design/icons';

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


import './style.scss';
import { chooseHeight } from '../../tools';

import SheetEditName from '../../components/SheetEditName';

const AdminCreateDocPage = () => {
    const [controlSheet, setControlSheet] = useState('');
    // const [height]

    const toolsRef = useRef(null);
    const actionsRef = useRef(null);
    const [container, setContainer] = useState(null);

    const [elementsSelectebled, setElementsSelectebled] = useState([]);


    const toggleElement = (sheetId, elId, type) => {
        console.log(sheetId, elId, type)
    }

    const [sheets, setSheets] = useState([{
        id: 0,
        content: []
    }]);

    const toggleSelectedContent = (idSheet, idContent) => {
        setSheets(sheets.map(sheet => {
            if (sheet.id === idSheet) {
                return {
                    ...sheet,
                    content: sheet.content.map(it => it.id === idContent ? {...it, selected: !it.selected } : it )
                }
            }
            return sheet
        }))
    }

    const cleanSelectedContent = () => {
        setSheets(sheets.map(sheet => ({
            ...sheet,
            content: sheet.content.map(it => ({ ...it, selected: false}))
        })))
    }

    const addPaper = () => {
        setSheets([ ...sheets, {
            id: sheets.length,
            content: []
        }]);
    }

    const addSheetContent = (id, content, nextPaper, type, rowCount) => {
        if (nextPaper) {
            

            // add our iten after we will added new paper 
            // to do

            const idx = sheets.findIndex(it => it.id === id);
            if (idx + 1 === sheets.length) {
                setTimeout(() => {
                    addPaper()
                }, 0);
                id = idx + 1;
            } else {
                sheets.slice(idx + 1).forEach(it => {
                    const sheet = document.querySelector(`.sheet${it.id}`);
                    const totalHeight = [...sheet.children].reduce((total, el) => total + el.clientHeight, 0);
                    if (chooseHeight(type, totalHeight, rowCount)) {
                        id = it.id;
                        return;
                    }
                })
            }
        }

        setControlSheet(id);
        setSheets(sheets.map(sheet => {
            if (sheet.id === id) {
                return {
                    ...sheet,
                    content: [ ...sheet.content, {
                        id: Math.random().toString(),
                        body: content,
                        text: '',
                        selected: false
                    }]
                }
            }

            return sheet
        }))
    }

    const deleteSheetContent = (idSheet, idContent) => {
        setSheets(sheets.map(sheet => {
            if (sheet.id === idSheet) {
                return {
                    ...sheet,
                    content: sheet.content.filter(it => it.id !== idContent)
                }
            }
            return sheet
        }))
    }

    const replaceSheetItem = (sortContent, idx) => {
        setSheets(sheets.map(it => {
            if (it.id === idx) {
                return { ...it, content: sortContent }
            }
            return it
        }))
    }

    const toggleSheetItemContent = (idSheet, idContent, content) => {
        setSheets(sheets.map(sheet => {
            if (sheet.id === idSheet) {
                console.log(sheet)
                return {
                    ...sheet,
                    content: sheet.content.map(it => it.id === idContent ? { ...it, text: content } : it)
                }
            }
            return sheet
        }))
    } 

    const deleteSelected = () => {
        setSheets(
            sheets.map(sheet => ({
                ...sheet,
                content: sheet.content.filter(it => !it.selected)
            }))
        )
    }

    const selectedCount = sheets.map(sheet => sheet.content.filter(it => it.selected)).flat().length;

    return (
        <DndProvider backend={Backend}>
            <div className="row page doc-create">
                <Affix style={{ width: '100px', marginRight: '38px' }} offsetTop={110}>
                    <div className="bg-light p-0 tools-wrapper">
                            <div className="tools-container" ref={setContainer}>
                                    <ToolHeading />
                                    <ToolParagraph />
                                    <ToolTable />
                            </div>
                        
                    </div>
                </Affix>
                <div className="col-lg-6 sheets-container">
                    {
                        sheets.map(sheet => <SheetItem 
                                                key={sheet.id}
                                                id={sheet.id}
                                                content={sheet.content}
                                                addSheetContent={addSheetContent}
                                                toggleElement={toggleElement}
                                                setContent={replaceSheetItem}
                                                deleteSheetContent={deleteSheetContent}
                                                toggleText={toggleSheetItemContent}
                                                toggleSelectedContent={toggleSelectedContent}
                                            />
                            )
                    }

                    <div className="text-center mb-5">
                        <Tooltip title="Добавить">
                            <Button className='btn-add' onClick={addPaper} size="large" shape="circle" type="default" icon={<PlusOutlined />} />
                        </Tooltip>
                    </div>
                </div>
                <Affix className="ml-auto" offsetTop={110}>
                    <div className="container-actions" >
                            <SheetEditName count={3} />
                        {
                        !!selectedCount &&
                            <div className="sheet-controller">
                                <span>Выбрано {selectedCount}</span><br />
                                <Button onClick={cleanSelectedContent} icon={<CloseCircleOutlined  />} type="dashed">Сбросить</Button>
                                <Button onClick={deleteSelected} icon={<DeleteOutlined  />} type="danger">Удалить</Button>

                                <div className="text-settings">
                                    <span>Настройки для текста:</span>
                                    <div className="align-text">
                                        Выравнивание: 
                                        <Tooltip title="По правому краю">
                                            <AlignLeftOutlined style={{ fontSize: '25px' }} />
                                        </Tooltip>
                                        <Tooltip title="По центру">
                                            <AlignCenterOutlined style={{ fontSize: '25px' }} />
                                        </Tooltip>
                                        <Tooltip title="По левому краю">
                                            <AlignRightOutlined style={{ fontSize: '25px' }}/>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        }  
                    </div>
                </Affix>
            </div>
        </DndProvider>
    )
}

export default AdminCreateDocPage;