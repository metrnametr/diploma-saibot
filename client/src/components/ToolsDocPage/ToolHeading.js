import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeading } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd';
import { DragTypes } from '../../constants';

const ToolHeading = () => {
    const [{isDragging}, drag] = useDrag({
        item: { type: DragTypes.TOOL_HEADING },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
      })

    return (
        <div className="tool-item text-center" ref={drag}>
            <FontAwesomeIcon icon={faHeading} />
        </div>
    )
}

export default ToolHeading;