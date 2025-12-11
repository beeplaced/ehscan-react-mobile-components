import React from "react";
export interface Props {
    trackMove?: (args?: any) => void;
    open: boolean;
    initialPosition?: {
        x: number;
        y: number;
    };
    initialWidth?: number;
    initialBodyPadding?: number;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
}
export declare const Window: React.FC<Props>;
