import React, { useState } from 'react';
import { Typography } from 'antd';
import { DragTypes } from '../../constants';

const { Title } = Typography;

const SheetHeading = (props) => {
    const {
        toggleElement,
        sheetId,
        idItem,
        style,
        text,
        toggleText
    } = props;

    const setValue = text => toggleText(sheetId, idItem, text);
    
    return (
        <Title
            onClick={() => toggleElement(sheetId, idItem, DragTypes.TOOL_HEADING)}
            style={{ wordWrap: 'break-word', cursor: 'pointer', ...style }}
            level={3}
            editable={{ onChange: setValue }}
        >{text || 'Введите заголовок'}</Title>
    )
}


export default SheetHeading;