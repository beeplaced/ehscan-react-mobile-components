import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './style/addbox.css';
export const AddBox = ({ title, value, onChange }) => {
    const closeBtn = () => (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [_jsx("line", { x1: "8", y1: "8", x2: "16", y2: "16", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "16", y1: "8", x2: "8", y2: "16", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" })] }));
    const plusBtn = () => (_jsxs("svg", { className: "ext-add-inputbox-plus-svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" })] }));
    const addRow = () => onChange([...value, { id: Date.now(), title: "" }]);
    const removeRow = (id) => onChange(value.filter((entry) => entry.id !== id));
    const changeTxt = (id, newTitle) => onChange(newTitle, id);
    const btnRow = (item) => (_jsxs("div", { className: "ext-add-content-row", children: [_jsx("div", { className: "ext-add-content-row-bullet", children: "\u2022" }), _jsx("input", { id: `inputAddBox-${item.id}`, className: "ext-addbox-input", type: "text", placeholder: "...", value: item.title, onChange: (e) => changeTxt(item.id, e.target.value), spellCheck: false }), _jsx("div", { className: "ext-addbox-textarea-tag-erase", onClick: () => removeRow(item.id), children: closeBtn() })] }, item.id));
    return (_jsxs("div", { className: "ext-add-inputbox", children: [_jsxs("div", { className: "ext-add-inputbox-title", children: [_jsx("div", { className: "ext-add-inputbox-title-txt", children: title }), _jsx("div", { className: "ext-add-inputbox-title-plus-wrapper", children: _jsx("div", { className: "ext-add-inputbox-title-plus", onClick: addRow, children: plusBtn() }) })] }), _jsx("div", { className: "ext-add-inputbox-body", children: value.map((item) => btnRow(item)) })] }));
};
