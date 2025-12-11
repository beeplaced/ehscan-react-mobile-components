import React from 'react';
type DragItemData = {
    id: number | string;
    label: string;
    selected?: boolean;
};
type DragItemProps = {
    item: DragItemData;
    click: (id: number | string) => void;
};
declare const DragItem: React.FC<DragItemProps>;
export default DragItem;
