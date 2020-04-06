import React, { useState } from 'react';
import { Typography } from 'antd';


const { Title } = Typography;

const SheetEditName = ({ count = 2 }) => {
    const [documentName, setDocumentName] = useState(`Новый документ (${count + 1})`);

    return (
        <div>
            <span>Название документа:</span>
            <Title level={3} editable={{ onChange: setDocumentName }}>{documentName}</Title>
        </div>
    )
}

export default SheetEditName;