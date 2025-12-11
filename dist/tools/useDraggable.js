import { useEffect, useRef } from "react";
export const useDraggable = (open, targetRef, handleRef, bodyRef, resizeHandleRef, bodyPadding = 0, // used in max-height calculation
trackMove) => {
    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const initialMouseX = useRef(0);
    const initialWidth = useRef(0);
    useEffect(() => {
        var _a;
        if (!open)
            return;
        const target = targetRef.current;
        const handleElement = (_a = handleRef === null || handleRef === void 0 ? void 0 : handleRef.current) !== null && _a !== void 0 ? _a : target;
        const resizeHandle = resizeHandleRef === null || resizeHandleRef === void 0 ? void 0 : resizeHandleRef.current;
        if (!target || !handleElement || !resizeHandle)
            return;
        // --- Drag start ---
        const handleMouseDown = (e) => {
            const rect = target.getBoundingClientRect();
            offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            isDragging.current = true;
            trackMove === null || trackMove === void 0 ? void 0 : trackMove(offset.current);
        };
        // --- Resize start (horizontal only) ---
        const handleResizeStart = (e) => {
            e.stopPropagation(); // prevent dragging
            isResizing.current = true;
            initialMouseX.current = e.clientX;
            initialWidth.current = target.offsetWidth;
            trackMove === null || trackMove === void 0 ? void 0 : trackMove({ x: initialWidth.current });
        };
        // --- Mouse move ---
        const handleMouseMove = (e) => {
            if (!target)
                return;
            // --- Dragging ---
            if (isDragging.current) {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                let newX = e.clientX - offset.current.x;
                let newY = e.clientY - offset.current.y;
                newX = Math.max(0, Math.min(newX, windowWidth - target.offsetWidth));
                newY = Math.max(0, Math.min(newY, windowHeight - target.offsetHeight));
                target.style.left = `${newX}px`;
                target.style.top = `${newY}px`;
            }
            // --- Horizontal resizing ---
            if (isResizing.current) {
                const rect = target.getBoundingClientRect();
                const diffX = e.clientX - initialMouseX.current;
                // Maximum width so window doesn't go off the right edge
                const maxWidthByScreen = window.innerWidth - rect.left;
                // Enforce both screen limit and 1000px max
                const newWidth = Math.max(200, Math.min(initialWidth.current + diffX, maxWidthByScreen, 1000));
                target.style.width = `${newWidth}px`;
                // Recalculate body max-height
                if ((bodyRef === null || bodyRef === void 0 ? void 0 : bodyRef.current) && handleElement) {
                    const availableHeight = target.offsetHeight - handleElement.offsetHeight - 2 * bodyPadding;
                    bodyRef.current.style.maxHeight = `${availableHeight}px`;
                    bodyRef.current.style.overflowY = "auto";
                }
            }
        };
        // --- Mouse up ---
        const handleMouseUp = () => {
            isDragging.current = false;
            isResizing.current = false;
            // recalc body max-height after drag stops
            if ((bodyRef === null || bodyRef === void 0 ? void 0 : bodyRef.current) && target) {
                const headerHeight = handleElement.offsetHeight;
                const windowRect = target.getBoundingClientRect();
                const availableHeight = window.innerHeight - windowRect.top - 20; // bottom margin
                const bodyMaxHeight = Math.max(100, availableHeight - headerHeight - 2 * bodyPadding);
                bodyRef.current.style.maxHeight = `${bodyMaxHeight}px`;
                bodyRef.current.style.overflowY = "auto";
            }
        };
        // Attach listeners
        handleElement.addEventListener("mousedown", handleMouseDown);
        resizeHandle.addEventListener("mousedown", handleResizeStart);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            handleElement.removeEventListener("mousedown", handleMouseDown);
            resizeHandle.removeEventListener("mousedown", handleResizeStart);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [open, targetRef, handleRef, bodyRef, resizeHandleRef, bodyPadding]);
};
