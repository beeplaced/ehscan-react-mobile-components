import React from 'react';
interface Item {
    id: number;
    label: string;
    selected?: boolean;
}
interface Props {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    changeItemsAction: (updatedItems: Item[]) => void;
}
export declare const DragAndDrop: React.FC<Props>;
export {};
