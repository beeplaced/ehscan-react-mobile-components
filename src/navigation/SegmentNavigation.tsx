import { useEffect, useRef, useState } from "react";
import styles from '../style/segment-navigation.module.css';

interface Props {
    segment: string;
    changeSegment: (segment: string) => void;
    pages: string[]; // pages passed as prop
}

interface UnderlineSettings {
    left: number;
    width: number;
}

export const SegmentNavigation: React.FC<Props> = ({ pages, changeSegment, segment }) => {
    const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [underlineSettings, setUnderlineSettings] = useState<UnderlineSettings>({ left: 0, width: 0 });
    const UNDERLINE_EXTRA = 10;

    useEffect(() => {
        const index = pages.findIndex((p) => p.toLowerCase() === segment.toLowerCase());
        const el = segmentRefs.current[index];
        if (!el) return; 
        setUnderlineSettings({
            width: el.offsetWidth + UNDERLINE_EXTRA * 2,
            left: el.offsetLeft - UNDERLINE_EXTRA,
        });
    }, [segment]);

    return (
        <div className={styles.segmentNav}>
            <div className={styles.segmentNavMain}>
                {pages.map((page, index) => (
                    <div
                        key={`page-${index}`}
                        ref={(el) => {
                            segmentRefs.current[index] = el;
                        }}
                        onClick={() => changeSegment(page)}
                    >
                        {page}
                    </div>
                ))}
            </div>
            <div className={styles.segmentUnderline}>
                <div
                    className={styles.segmentUnderlineInner}
                    style={{
                        width: `${underlineSettings.width}px`,
                        left: `${underlineSettings.left}px`,
                    }}
                />
            </div>
        </div>
    );
};