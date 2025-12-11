import { useCallback } from "react";
export const useChangeAddBox = (inValue, setInValue, tag) => {
    const changeTag = useCallback((value, id) => {
        if (!(tag in inValue))
            return;
        if (id !== undefined) { // change single row
            setInValue(prev => (Object.assign(Object.assign({}, prev), { [tag]: prev[tag].map(item => item.id === id ? Object.assign(Object.assign({}, item), { title: value }) : item) })));
            return;
        }
        setInValue(prev => (Object.assign(Object.assign({}, prev), { [tag]: value })));
    }, [inValue, setInValue, tag]);
    return changeTag;
};
