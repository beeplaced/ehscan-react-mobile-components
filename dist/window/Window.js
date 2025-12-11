import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { useDraggable } from "../tools/useDraggable"; // adjust path as needed
import styles from '../style/window.module.css';
export const Window = ({ trackMove, open, initialPosition = { x: 600, y: 100 }, initialWidth = 400, initialBodyPadding = 20, header, body, footer, onClose, }) => {
    const targetRef = useRef(null);
    const headerRef = useRef(null);
    const resizeHandleRef = useRef(null);
    const bodyRef = useRef(null);
    const footerRef = useRef(null);
    const [bodyPadding] = useState(initialBodyPadding);
    const [windowWidth] = useState(initialWidth);
    useDraggable(open, targetRef, headerRef, bodyRef, resizeHandleRef, bodyPadding, trackMove);
    useEffect(() => {
        if (!bodyRef.current || !targetRef.current || !headerRef.current)
            return;
        const headerHeight = headerRef.current.offsetHeight;
        const topPosition = targetRef.current.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - topPosition - 20; // 20px bottom margin
        const bodyMaxHeight = Math.max(100, availableHeight - headerHeight - 2 * bodyPadding);
        bodyRef.current.style.maxHeight = `${bodyMaxHeight}px`;
        bodyRef.current.style.overflowY = "auto";
    }, [bodyPadding]);
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        if (open === undefined)
            return;
        setTimeout(() => {
            setFadeIn(open);
        }, 0);
    }, [open]);
    if (!open)
        return null;
    return (_jsxs("div", { ref: targetRef, className: `${styles.extWindow} ${fadeIn ? styles.fadeIn : ""}`, style: { left: `${initialPosition.x}px`, top: `${initialPosition.y}px`, minWidth: `${windowWidth}px` }, children: [_jsx("div", { ref: headerRef, className: styles.windowHeader, children: header !== null && header !== void 0 ? header : (_jsxs(_Fragment, { children: [_jsx("div", { children: "||" }), _jsx("div", { children: "Header" }), _jsx("div", { onClick: onClose, children: "close" })] })) }), _jsx("div", { ref: bodyRef, className: styles.windowBody, style: { padding: `${bodyPadding}px` }, children: body !== null && body !== void 0 ? body : _jsx(_Fragment, { children: "Body" }) }), footer && (_jsx("div", { ref: footerRef, className: styles.footer, children: footer })), _jsx("div", { className: styles.resizeHandle, ref: resizeHandleRef })] }));
};
