import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { Popover, InputNumber, Row, Col } from 'antd';
import { useDrag } from 'react-dnd';

import { DragTypes } from '../../constants';


const PopoverContent = (
    { colCount, rowCount, toggleColCount, toggleRowCount }
    ) => {
    return (
        <div>
            <Row className="mb-1">
                <Col span={10}>Столцов:</Col> 
                <Col span={4}>
                    <InputNumber onChange={toggleColCount} defaultValue={colCount} min={1} />
                </Col>
            </Row>
            <Row>
                <Col span={10}>Строк:</Col>
                <Col span={4}>
                    <InputNumber onChange={toggleRowCount} defaultValue={rowCount} min={1} />
                </Col>
            </Row>
        </div>
    )
}

const ToolTable = () => {
    const [colCount, setColCout] = useState(1);
    const [rowCount, setRowCount] = useState(1);

    const [{isDragging}, drag] = useDrag({
        item: { type: DragTypes.TOOL_TABLE, colCount, rowCount },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
    })

    return (
        <Popover
            placement="right" 
            content={
                <PopoverContent 
                    colCount={colCount} 
                    rowCount={rowCount}
                    toggleColCount={setColCout}
                    toggleRowCount={setRowCount}
                />
            } 
            title="Количество"
        >
            <div className="tool-item text-center" ref={drag}>
                    <FontAwesomeIcon icon={faTable} />
            </div>
        </Popover>
    )
}

export default ToolTable;