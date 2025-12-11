import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
export const DropDown = forwardRef(({ openDropDown, display, addItem, searchTerm, maxDropDownEntries, maxDropDownHeight }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 0 });
    const containerRef = useRef(null);
    const [tabId, setTabId] = useState(undefined);
    const itemRefs = useRef([]);
    useEffect(() => {
        if (!openDropDown || display.length === 0)
            return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setTabId(prevTabId => {
                    var _a;
                    const next = prevTabId === undefined || prevTabId >= display.length - 1 ? 0 : prevTabId + 1;
                    // scroll into view
                    (_a = itemRefs.current[next]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                    return next;
                });
            }
            if (e.key === 'ArrowUp') {
                setTabId(prevTabId => {
                    var _a;
                    const next = prevTabId === undefined || prevTabId <= 0 ? display.length - 1 : prevTabId - 1;
                    (_a = itemRefs.current[next]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                    return next;
                });
            }
            if (e.key === "Enter" && tabId !== undefined) {
                console.log('use', display[tabId]);
                addItem(tabId);
                setTabId(prevTabId => {
                    if (prevTabId === undefined)
                        return 0;
                    if (display[prevTabId])
                        return prevTabId;
                    if (display[prevTabId - 1])
                        return prevTabId - 1;
                    return 0;
                });
            }
            // Add other keys here if needed
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown); // cleanup
        };
    }, [openDropDown, display, tabId]);
    useImperativeHandle(ref, () => ({
        calc: () => {
            console.log("calc");
            setTimeout(() => {
                calcDropDown();
            }, 50);
        },
    }));
    const HighlightedText = ({ text, searchTerm, maxLength = 150 }) => {
        if (!searchTerm) {
            const sliced = text.slice(0, maxLength);
            return (_jsxs("div", { children: [sliced, text.length > maxLength && '…'] }));
        }
        const searchWords = searchTerm
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);
        if (searchWords.length === 0) {
            return _jsx("div", { children: text.slice(0, maxLength) });
        }
        const lowerText = text.toLowerCase();
        let firstMatchIndex = -1;
        for (let word of searchWords) {
            const index = lowerText.indexOf(word);
            if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
                firstMatchIndex = index;
            }
        }
        let sliceStart = 0;
        let sliceEnd = maxLength;
        if (firstMatchIndex > -1) {
            const foundWord = searchWords.find(w => lowerText.includes(w));
            if (firstMatchIndex > -1 && foundWord) {
                const matchEnd = firstMatchIndex + foundWord.length;
                if (matchEnd > maxLength) {
                    sliceEnd = Math.min(text.length, matchEnd);
                    sliceStart = sliceEnd - maxLength;
                }
            }
        }
        const displayText = text.slice(sliceStart, sliceEnd);
        const highlightRegex = new RegExp(`(${searchWords.join('|')})`, 'gi');
        const parts = displayText.split(highlightRegex);
        return (_jsxs(_Fragment, { children: [sliceStart > 0 && '…', parts.map((part, i) => searchWords.includes(part.toLowerCase()) ? (_jsx("span", { className: "highlight-words", children: part }, i)) : (_jsx("span", { children: part }, i))), sliceEnd < text.length && '…'] }));
    };
    const calcDropDown = () => {
        if (!(containerRef === null || containerRef === void 0 ? void 0 : containerRef.current))
            return;
        const rect = containerRef.current.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - rect.bottom;
        setPosition({
            top: rect.bottom - 10,
            left: rect.left,
            width: rect.width,
            maxHeight: maxDropDownHeight || distanceToBottom - 50
        });
    };
    useEffect(() => {
        if (openDropDown && containerRef.current) {
            calcDropDown();
        }
        ;
    }, [openDropDown]);
    const addDropDownItem = (index) => {
        addItem(index);
        setTimeout(() => {
            calcDropDown();
        }, 50);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "ext-window-dropdown-edge", ref: containerRef }), openDropDown && display.length > 0 && (_jsxs("div", { className: "ext-window-dropdown", style: {
                    top: position.top,
                    left: position.left,
                    width: position.width
                }, children: [maxDropDownEntries !== undefined && (_jsxs("div", { className: "dropdown-amount-row", children: [display.length, " / ", maxDropDownEntries, " entries"] })), _jsx("div", { className: "ext-window-dropdown-wrapper _ewb", style: { maxHeight: `${position.maxHeight}px`, }, children: display.map((item, index) => (_jsx("div", { ref: el => { itemRefs.current[index] = el; }, className: `dropdown-item ${index === tabId ? 'focused' : ''}`, tabIndex: 0, onClick: () => addDropDownItem(index), onFocus: () => setTabId(index), children: _jsx(HighlightedText, { text: item, searchTerm: searchTerm }) }, index))) })] }))] }));
});
