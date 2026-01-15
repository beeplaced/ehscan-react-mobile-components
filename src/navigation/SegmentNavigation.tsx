import { useEffect, useRef, useState } from "react";
import styles from '../style/segment-navigation.module.css';

type Language = "de" | "en";

interface PageConfig {
  page: string;
  title: Record<Language, string>;
}

interface Props {
    segment: string;
    changeSegment: (segment: string) => void;
    pages: PageConfig[]; // pages passed as prop
    lang?: Language;
}

interface UnderlineSettings {
    left: number;
    width: number;
}

export const SegmentNavigation: React.FC<Props> = ({ pages, changeSegment, segment, lang = 'de' }) => {
    const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [underlineSettings, setUnderlineSettings] = useState<UnderlineSettings>({ left: 0, width: 0 });
    const UNDERLINE_EXTRA = 10;

    useEffect(() => {
        const index = pages.findIndex((p) => p.page.toLowerCase() === segment.toLowerCase());
        const el = segmentRefs.current[index];
        if (!el) return; 
        setUnderlineSettings({
            width: el.offsetWidth + UNDERLINE_EXTRA * 2,
            left: el.offsetLeft - UNDERLINE_EXTRA,
        });
    }, [segment]);

    return (
        <div className={styles.segmentNav}>
            <div className={styles.segmentNavMain}
            style={{ '--cols': pages.length } as React.CSSProperties}
            >
                {pages.map((p, index) => (
                    <div
                        key={`page-${index}`}
                        ref={(el) => {
                            segmentRefs.current[index] = el;
                        }}
                        onClick={() => changeSegment(p.page)}>
                        {p.title[lang]}
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