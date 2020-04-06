import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParagraph } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd';

import { DragTypes } from '../../constants';

const ToolParagraph = () => {
    const [{isDragging}, drag] = useDrag({
        item: { type: DragTypes.TOOL_PARAGRAPH },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
    })

    return (
        <div className="tool-item text-center" ref={drag}>
            <FontAwesomeIcon icon={faParagraph} />
        </div>
    )
}

export default ToolParagraph;