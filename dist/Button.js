import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useCallback } from "react";
import useRipple from "./tools/useRipple";
import './style/button.css';
export const Button = ({ index, text, selected, addClass, notimeout, size = 'md', click, children }) => {
    const buttonRef = useRef(null);
    const handleRipple = useRipple();
    const handleButtonClick = useCallback((event) => {
        handleRipple(event, buttonRef);
        if (notimeout) {
            click === null || click === void 0 ? void 0 : click(event);
            return;
        }
        setTimeout(() => {
            click === null || click === void 0 ? void 0 : click(event);
        }, 200);
    }, [notimeout, click, handleRipple]);
    return (_jsx(_Fragment, { children: _jsxs("button", { type: "button", ref: buttonRef, onClick: handleButtonClick, className: `ext-btn ext-btn--${size} _ripple ${addClass !== null && addClass !== void 0 ? addClass : 'ext-btn--primary'}`, "aria-pressed": selected, children: [children, text && _jsx("div", { className: "ext-btn-label", children: text })] }, index) }));
};
