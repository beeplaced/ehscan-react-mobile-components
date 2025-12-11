import { useCallback } from "react";

type Entry = { id: number; title: string };
type InValue = Record<string, Entry[]>;

export const useChangeAddBox = (
  inValue: InValue,
  setInValue: React.Dispatch<React.SetStateAction<InValue>>,
  tag: string
) => {
  const changeTag = useCallback(
    (value: Entry[] | string, id?: number) => {
      if (!(tag in inValue)) return;

      if (id !== undefined) { // change single row
        setInValue(prev => ({
          ...prev,
          [tag]: prev[tag].map(item =>
            item.id === id ? { ...item, title: value as string } : item
          )
        }));
        return;
      }

      setInValue(prev => ({ // replace entire array
        ...prev,
        [tag]: value as Entry[]
      }));
    },
    [inValue, setInValue, tag]
  );

  return changeTag;
};