import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { debounce } from 'lodash';
const { Paragraph } = Typography;

const SheetParagraph = (props) => {
    const {
        text,
        style,
        toggleText,
        idSheet,
        idItem
    } = props;

    const setValue = text => toggleText(idSheet, idItem, text);

    return (
        <div style={{ ...style }}>
            <Paragraph style={{ wordWrap: 'break-word' }}  editable={{ onChange: setValue }}>{text || 'Введите текст'}</Paragraph>
        </div>
    )
}


export default SheetParagraph;