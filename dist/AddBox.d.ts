import React from "react";
import './style/addbox.css';
interface Entry {
    id: number;
    title: string;
}
interface Props {
    title: string;
    value: Entry[];
    onChange: (value: string | Entry[], id?: number) => void;
}
export declare const AddBox: React.FC<Props>;
export {};
