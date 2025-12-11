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
import { useRef, useState, useId, useEffect } from "react";
import { DropDown } from "./DropDown";
import './style/input-dropdown.css';
export const TextAreaDropDown = ({ id, tabIndex, alwaysOpenDropDown, closeCommand, label, value, editable = true, required = false, dropdownValue, onChange, placeholder = 'select or create new entry', maxLength = 500, addClass, maxDropDownHeight = 200 }) => {
    const childRef = useRef(null);
    const textareaRef = useRef(null);
    const searchInput = useRef(null);
    const [charCount, setCharCount] = useState(value.length);
    const generatedId = useId(); // unique fallback for aria linking
    const textareaId = id || `textarea-${generatedId}`;
    const [openDropDown, setOpenDropDown] = useState(false);
    const [maxDropDownEntries, setMaxDropDownEntries] = useState(undefined);
    const [tags, setTags] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterItems, setFilterItem] = useState([]);
    useEffect(() => {
        setTags(value);
        setCharCount(value.length);
        if (dropdownValue === undefined)
            return;
        setMaxDropDownEntries(dropdownValue.length);
    }, [value]);
    const handleKeyDown = (e) => {
        if (newBtn && e.key === 'Enter' && searchTerm !== '') {
            createItem();
            return;
        }
        if (e.key === "Backspace" && searchTerm === "" && value.length > 0) {
            if (tags === null || tags === void 0 ? void 0 : tags.length) {
                removeTag(tags[tags.length - 1]);
            }
        }
    };
    useEffect(() => {
        if (searchTerm === undefined || value === undefined)
            return;
        const dropDownEntry = dropdownValue.filter(tag => !value.includes(tag));
        if (!searchTerm || searchTerm === '') {
            setFilterItem(dropDownEntry);
            return;
        }
        const filterAndProcessItems = () => __awaiter(void 0, void 0, void 0, function* () {
            const searchWords = searchTerm
                .toLowerCase()
                .split(/\s+/) // split by whitespace
                .filter(Boolean); // remove empty strings
            const filtered = yield Promise.all(// some ✅ ANY search word should match (common) | All shall match -> every
            dropDownEntry
                .filter(item => searchWords.every(word => item.toLowerCase().includes(word.toLowerCase())))
                .map((item) => __awaiter(void 0, void 0, void 0, function* () { return item; })));
            setFilterItem(filtered);
        });
        filterAndProcessItems();
    }, [searchTerm, value]);
    const removeTag = (tagToRemove) => {
        var _a;
        onChange(tagToRemove, 'remove');
        if (childRef.current)
            (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.calc();
    };
    const addItem = (entry) => {
        var _a;
        if (entry === undefined || !filterItems[entry])
            return;
        const newValue = filterItems[entry];
        console.log(newValue);
        onChange(newValue, 'add');
        if (!searchInput.current)
            return;
        searchInput.current.focus();
        if (childRef.current)
            (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.calc();
    };
    const createItem = () => {
        var _a;
        if (searchTerm === undefined || searchTerm === '')
            return;
        onChange(searchTerm, 'add');
        if (!searchInput.current)
            return;
        searchInput.current.value = '';
        searchInput.current.focus();
        setSearchTerm("");
        if (childRef.current)
            (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.calc();
    };
    const [newBtn, setNewBtn] = useState(false);
    useEffect(() => {
        if (searchTerm === undefined)
            return;
        if (searchTerm !== "")
            setOpenDropDown(true); //if closed on !alwaysOpenDropDown
        if (dropdownValue.includes(searchTerm)) {
            setNewBtn(false);
            return;
        }
        if (searchTerm !== '')
            setNewBtn(true);
    }, [searchTerm]);
    useEffect(() => {
        if (!closeCommand)
            return;
        setOpenDropDown(false);
    }, [closeCommand]);
    const focusInput = () => {
        if (alwaysOpenDropDown) {
            setOpenDropDown(true);
            return;
        }
        console.log(searchTerm);
        if (searchTerm) {
            setOpenDropDown(true);
        }
    };
    const blurInput = () => {
        // setOpenDropDown(false)
        // setNewBtn(false)
        // setSearchTerm('')
    };
    if (!tags)
        return null;
    return (_jsxs("div", { className: `ext-textarea-wrapper-dropdown ${addClass}`, ref: textareaRef, children: [label && (_jsxs("div", { className: "ext-textarea-label", children: [_jsxs("label", { className: "ext-textarea-label-title", htmlFor: textareaId, children: [label, " ", required && _jsx("span", { className: "required", children: "*" })] }), _jsxs("div", { className: "ext-textarea-label-btns", children: [editable && charCount > 0 && (_jsxs("div", { className: "form-container-count", children: [charCount, " / ", maxLength] })), editable && charCount > 0 && (_jsx("div", { className: "ext-textarea-svg-close", "aria-label": `Clear ${label !== null && label !== void 0 ? label : "text area"}` }))] })] })), _jsx("div", { className: `ext-textarea-box-dropdown${openDropDown ? ' open' : ''}`, onClick: () => focusInput(), children: _jsxs("div", { className: "ext-textarea-dropdown-inner", children: [tags.map((item, index) => (_jsxs("div", { className: "textarea-tag loop", children: [_jsx("div", { children: item }), _jsx("div", { className: "textarea-tag-erase", onClick: () => removeTag(tags[index]), children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("line", { x1: "8", y1: "8", x2: "16", y2: "16", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "16", y1: "8", x2: "8", y2: "16", stroke: "#333", strokeWidth: "1", strokeLinecap: "round" })] }) })] }, index))), _jsx("div", { className: "search-x-wrapper", children: _jsxs("div", { className: "search-x", children: [_jsx("div", { className: "search-x-input", children: _jsx("input", { type: "text", tabIndex: tabIndex, ref: searchInput, onFocus: () => focusInput(), onBlur: () => blurInput(), placeholder: placeholder, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onKeyDown: handleKeyDown }) }), _jsx("div", { className: `search-x-btn${newBtn ? ' show' : ''}`, onClick: () => createItem(), children: newBtn && 'create new one' })] }) })] }) }), _jsx(DropDown, { ref: childRef, maxDropDownHeight: maxDropDownHeight, openDropDown: openDropDown, display: filterItems, addItem: addItem, maxDropDownEntries: maxDropDownEntries, searchTerm: searchTerm })] }));
};
export default TextAreaDropDown;
