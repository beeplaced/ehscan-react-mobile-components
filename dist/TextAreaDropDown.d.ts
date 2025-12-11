import './style/input-dropdown.css';
type Action = "add" | "remove";
interface Props {
    id?: string;
    tabIndex?: number;
    alwaysOpenDropDown?: boolean;
    closeCommand?: any;
    editable?: boolean;
    label?: string;
    required?: boolean;
    value: string[];
    dropdownValue: string[];
    onChange: (value: string, action: Action) => void;
    placeholder?: string;
    maxLength?: number;
    addClass?: string;
    maxDropDownHeight?: number;
}
export declare const TextAreaDropDown: React.FC<Props>;
export default TextAreaDropDown;
