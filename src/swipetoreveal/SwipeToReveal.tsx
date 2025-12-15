import { ReactNode, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./swipetoreveral.module.css"

interface Row {
    id: number;
    checked?: boolean;
    risk_rating?: number;
    safeguard?: string;
}

interface ButtonProp {
  title: ReactNode;
  action: string;
  backClr: string;
  clr: string;
  width: number;
}

interface ButtonsConfig {
  left: ButtonProp[];
  right: ButtonProp[];
}

interface Props {
    row: Row;
    children: ReactNode;
    close: number;
    buttons: ButtonsConfig;
    setClose: (value: number) => void;
    action: (value: any) => void;
}

export const SwipeToReveal: React.FC<Props> = ({ row, buttons, close, setClose, action, children }) => {
    const [offsetX, setOffsetX] = useState(0);
    const [openSide, setOpenSide] = useState<"left" | "right" | undefined>();
    const [isDragging, setIsDragging] = useState(false);
    const [borderRadius, setBorderRadius] = useState(4);
    const [lengthEnhancer, setLengthEnhancer] = useState(0);
    const leftButtonRef = useRef<HTMLDivElement>(null);
    const rightButtonRef = useRef<HTMLDivElement>(null);
    const [maxSwipe, setMaxSwipe] = useState({ leftWidth: 0, rightWidth: 0 });
    const threshold = 30;

    useEffect(() => {
        console.log(close, row.id)
        if (close === undefined) return
        if (close === row.id) return;
        closeIten()
    }, [close]);

    const clickMain = () => {
        closeIten();
    };

    const closeIten = () => {
        setOffsetX(0);
        setOpenSide(undefined);
        setLengthEnhancer(0);
    }

    useEffect(() => {
        const leftWidth = leftButtonRef.current?.getBoundingClientRect().width ?? 0;
        const rightWidth = rightButtonRef.current?.getBoundingClientRect().width ?? 0;
        setMaxSwipe({ leftWidth, rightWidth });
    }, []);

    // Update border radius based on current offset
    useEffect(() => {
        const maxSwipeDistance = offsetX > 0 ? maxSwipe.leftWidth : maxSwipe.rightWidth;
        const radius = maxSwipeDistance > 0
            ? 4 + (Math.abs(offsetX) / maxSwipeDistance) * 8
            : 4;
        setBorderRadius(radius);
    }, [offsetX, maxSwipe]);

    const dragStartOffset = useRef(0);

    // Swipe handlers
    const handlers = useSwipeable({
        onSwipeStart: () => {
            dragStartOffset.current = offsetX; // remember current position when drag starts
        },
        onSwiping: ({ deltaX }) => {
            setIsDragging(true);
            const newOffset = dragStartOffset.current + deltaX;
            const clampedOffset = newOffset > 0 ? Math.min(newOffset, maxSwipe.leftWidth) : Math.max(newOffset, -maxSwipe.rightWidth);

            if (openSide === "right" && clampedOffset > 0) {
                setLengthEnhancer(clampedOffset);
                return;
            }

            setLengthEnhancer(0);
            setOffsetX(clampedOffset);
        },
        onSwiped: ({ deltaX }) => {
            setIsDragging(false);
            setLengthEnhancer(0);
            // Determine swipe direction
            if (offsetX > 0) { // main div was swiped right
                if (deltaX > threshold) {
                    setOpenSide('left');
                    setOffsetX(maxSwipe.leftWidth);
                } else {
                    // snap back closed instead of opening left immediately
                    setOpenSide(undefined);
                    setOffsetX(0);
                }
            } else if (offsetX < 0) { // main div was swiped left
                if (deltaX < -threshold) {
                    setOpenSide('right');
                    setOffsetX(-maxSwipe.rightWidth);
                } else {
                    setOpenSide(undefined);
                    setOffsetX(0);
                }
            } else { // neutral state, snap closed
                setOpenSide(undefined);
                setOffsetX(0);
            }
           setClose(row.id)
        },
        trackMouse: true,
        preventScrollOnSwipe: true
    });

    return (
        <div className={styles.swipeContainer}>
            <div
                className={`${styles.hiddenDiv} ${styles.start}`}
                ref={leftButtonRef}
                style={{ "--border-radius": `${borderRadius}px` } as React.CSSProperties} >
                {buttons.left.map((b, i) => (
                    <div key={i}
                        className={`${styles.hiddenBtn} ${styles.left}`}
                        style={{ backgroundColor: b.backClr, color: b.clr, width: b.width }}
                        onClick={() => action({id: row.id, action: b.action})}>
                        {b.title}
                    </div>
                ))}
            </div>
            <div
                className={`${styles.hiddenDiv} ${styles.end}`}
                ref={rightButtonRef}
                style={{ "--border-radius": `${borderRadius}px` } as React.CSSProperties} >
                {buttons.right.map((b, i) => (
                    <div key={i}
                        className={`${styles.hiddenBtn} ${styles.right}`}
                        style={{ backgroundColor: b.backClr, color: b.clr, width: b.width }}
                        onClick={() => action({id: row.id, action: b.action})}>
                        {b.title}
                    </div>
                ))}
            </div>
            <div
                {...handlers}
                className={`${styles.mainDiv} ${isDragging ? styles.mainDivDragging : styles.mainDivSnap}`}
                onClick={clickMain}
                style={{
                    "--main-length-enhancer": `${lengthEnhancer}px`,
                    transform: `translateX(${offsetX}px)`,
                } as React.CSSProperties}
            >
                {children}
            </div>
        </div>
    );
};