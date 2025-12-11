import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../style/dnd.module.css';
import ChecklistItemSquare from "./ChecklistItemSquare";
const DragItem = ({ item, click }) => {
    var _a;
    const selected = (_a = item.selected) !== null && _a !== void 0 ? _a : false;
    return (_jsxs("div", { className: styles.itemBody, children: [_jsx("div", { className: styles.dndSelect, onClick: () => click(item.id), children: _jsx(ChecklistItemSquare, { checked: selected }) }), _jsx("div", { children: item.label })] }));
};
export default DragItem;
