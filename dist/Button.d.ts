import { ReactNode } from "react";
import './style/button.css';
type Props = {
    index?: string | number;
    text?: string;
    selected?: boolean;
    addClass?: string;
    notimeout?: boolean;
    size?: 'sm' | 'md' | 'lg';
    click?: (args?: any) => void;
    children?: ReactNode;
};
export declare const Button: React.FC<Props>;
export {};
