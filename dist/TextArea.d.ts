import './style/input.css';
interface Props {
    id?: string;
    tabIndex?: number;
    editable?: boolean;
    label?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    addClass?: string;
}
export declare const TextArea: React.FC<Props>;
export {};
