import { DragTypes, SheetHeight } from '../constants';

export const chooseHeight = (type, height, rowCount = 0) => {
    switch(type) {
        case DragTypes.TOOL_HEADING: {
            if (height + SheetHeight.SHEET_HEIGHT_HEADING < SheetHeight.SHEET_MAX_HEIGHT) {
                return true;
            }
        }
        case DragTypes.TOOL_PARAGRAPH: {
            if (height + SheetHeight.SHEET_HEIGHT_PARAGRAPH < SheetHeight.SHEET_MAX_HEIGHT) {
                return true;
            }
        }
        case DragTypes.TOOL_TABLE: {
            if (height + SheetHeight.SHEET_HEIGHT_TABLE + (rowCount * SheetHeight.SHEET_HEIGHT_TABLE_ROW) < SheetHeight.SHEET_MAX_HEIGHT) {
                return true;
            }
        }
    }
    return false;
}