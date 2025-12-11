var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import styles from '../style/dnd.module.css';
import DragItem from './DragItem';
import { debounce } from "../tools/Debounce";
export const DragAndDrop = ({ items, setItems, changeItemsAction }) => {
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [popItem, setPopItem] = useState(null);
    const containerRef = useRef(null);
    const draggingIndexRef = useRef(null);
    const hoverIndexRef = useRef(null);
    useEffect(() => {
        console.log(hoverIndexRef.current, draggingIndexRef.current);
    }, [draggingIndexRef, hoverIndexRef]);
    const onMouseDown = (e, index) => {
        const el = document.getElementById(`item-${index}`);
        if (!el)
            return;
        const rect = el.getBoundingClientRect();
        draggingIndexRef.current = index;
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setDragPosition({
            x: rect.left,
            y: rect.top,
        });
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = (e) => {
        setDragPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
        });
        const container = containerRef.current;
        if (!container)
            return;
        const rects = Array.from(container.children)
            .filter((_, idx) => idx !== draggingIndexRef.current) // skip placeholder
            .map((child) => child.getBoundingClientRect());
        const mouseY = e.clientY;
        let newHoverIndex = items.length - 1; // default to last
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (mouseY < r.top + r.height / 2) {
                newHoverIndex = i;
                break;
            }
        }
        if (newHoverIndex !== hoverIndexRef.current)
            hoverIndexRef.current = newHoverIndex;
    };
    const onMouseUp = () => {
        if (draggingIndexRef.current !== null &&
            hoverIndexRef.current !== null &&
            draggingIndexRef.current !== hoverIndexRef.current) {
            const copy = [...items];
            const dragged = copy[draggingIndexRef.current];
            copy[draggingIndexRef.current] = copy[hoverIndexRef.current];
            copy[hoverIndexRef.current] = dragged;
            setItems(copy);
            changeItemsAction(copy);
            debouncedSave.current(copy); // your existing debounce
        }
        setPopItem(hoverIndexRef.current);
        draggingIndexRef.current = null;
        hoverIndexRef.current = null;
        setDragPosition({ x: 0, y: 0 });
        setTimeout(() => { setPopItem(null); }, 300);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    };
    const debouncedSave = useRef(debounce((copy) => {
        const doSave = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fixRows(copy);
            }
            catch (err) {
                console.error('Autosave failed:', err);
            }
        });
        doSave();
    }, 800));
    const fixRows = (copy) => __awaiter(void 0, void 0, void 0, function* () {
        const sortedCopy = [...copy]
            .map(item => (Object.assign(Object.assign({}, item), { selected: !!item.selected })))
            .sort((a, b) => Number(b.selected) - Number(a.selected));
        setItems(sortedCopy);
    });
    const clickDragItem = (targetId) => {
        const copy = items.map(item => item.id === targetId ? Object.assign(Object.assign({}, item), { selected: !item.selected }) : item);
        setItems(copy);
        changeItemsAction(copy);
        debouncedSave.current(copy); // your existing debounce
    };
    if (!items)
        return null;
    return (_jsxs("div", { ref: containerRef, className: styles.dndcontainer, children: [items.map((item, index) => {
                const isPoping = index === popItem;
                const isDragging = index === draggingIndexRef.current;
                return (_jsx("div", { style: { width: "100%" }, children: _jsxs("div", { id: `item-${index}`, className: `${styles.listItem} ${isDragging ? styles.placeholder : ''} ${hoverIndexRef.current === index ? styles.hovered : ''} ${isPoping ? styles.pop : ''} ${item.selected ? styles.selected : ''}`, children: [_jsx("div", { className: styles.dragHandle, onMouseDown: (e) => onMouseDown(e, index), children: "\u283F" }), _jsx(DragItem, { item: item, click: clickDragItem })] }) }, item.id));
            }), draggingIndexRef.current !== null && (_jsx("div", { className: styles.dragGhost, style: {
                    top: dragPosition.y,
                    left: dragPosition.x,
                    position: "fixed",
                }, children: items[draggingIndexRef.current].label }))] }));
};
