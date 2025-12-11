type Entry = {
    id: number;
    title: string;
};
type InValue = Record<string, Entry[]>;
export declare const useChangeAddBox: (inValue: InValue, setInValue: React.Dispatch<React.SetStateAction<InValue>>, tag: string) => (value: Entry[] | string, id?: number) => void;
export {};
