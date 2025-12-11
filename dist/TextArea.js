import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState, useCallback, useId } from "react";
import './style/input.css';
export const TextArea = ({ id, tabIndex, label, value, editable = true, required = false, onChange, placeholder, maxLength = 500, addClass }) => {
    const textareaRef = useRef(null);
    const [charCount, setCharCount] = useState(value.length);
    const generatedId = useId(); // unique fallback for aria linking
    const textareaId = id || `textarea-${generatedId}`;
    // 🔧 Resize and update char count whenever value changes
    useLayoutEffect(() => {
        setHeight();
        setCharCount(value.length);
    }, [value]);
    const setHeight = () => {
        const el = textareaRef.current;
        if (!el)
            return;
        el.style.height = "auto";
        el.style.height = `${Math.max(el.scrollHeight, 20)}px`;
    };
    const handleInputChange = useCallback((event) => {
        const newValue = event.target.value;
        onChange(newValue);
        setCharCount(newValue.length);
    }, [onChange]);
    const handleFocus = useCallback(() => {
        const el = textareaRef.current;
        if (!el)
            return;
        requestAnimationFrame(() => {
            el.focus({ preventScroll: true });
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        setHeight();
    }, []);
    const clear = useCallback(() => {
        onChange("");
        setCharCount(0);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [onChange]);
    return (_jsxs("div", { className: `ext-textarea-wrapper ${addClass}`, children: [label && (_jsxs("div", { className: "ext-textarea-label", children: [_jsxs("label", { className: "ext-textarea-label-title", htmlFor: textareaId, children: [label, " ", required && _jsx("span", { className: "required", children: "*" })] }), _jsxs("div", { className: "ext-textarea-label-btns", children: [editable && charCount > 0 && (_jsxs("div", { className: "form-container-count", children: [charCount, " / ", maxLength] })), editable && charCount > 0 && (_jsx("div", { className: "ext-textarea-svg-close", onClick: clear, "aria-label": `Clear ${label !== null && label !== void 0 ? label : "text area"}`, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("line", { x1: "8", y1: "8", x2: "16", y2: "16", stroke: "#333", strokeWidth: "2", strokeLinecap: "round" }), _jsx("line", { x1: "16", y1: "8", x2: "8", y2: "16", stroke: "#333", strokeWidth: "2", strokeLinecap: "round" })] }) }))] })] })), _jsx("div", { className: "ext-textarea-box", children: _jsx("textarea", { id: textareaId, tabIndex: tabIndex, ref: textareaRef, value: value !== null && value !== void 0 ? value : "", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "...", maxLength: maxLength, onChange: handleInputChange, onFocus: handleFocus, onBlur: setHeight, className: `ext-textarea${required && value === "" ? " highlight" : ""}`, rows: 1, spellCheck: false, readOnly: !editable, "aria-required": required, "aria-label": label }) })] }));
};
