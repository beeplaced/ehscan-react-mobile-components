export type DropDownHandle = {
    calc: () => void;
};
type DropDownProps = {
    openDropDown: boolean;
    display: string[];
    addItem: (index: number) => void;
    searchTerm: string;
    maxDropDownEntries?: number;
    maxDropDownHeight?: number;
};
export declare const DropDown: import("react").ForwardRefExoticComponent<DropDownProps & import("react").RefAttributes<DropDownHandle>>;
export {};
