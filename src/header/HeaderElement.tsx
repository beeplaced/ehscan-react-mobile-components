import { useRef, useState, ReactNode, useEffect } from "react";
import styles from '../style/header.module.css'

type Props = {
  index: string | number;
  initButton?: ReactNode;
  secondaryButton?: ReactNode;
  editButton?: ReactNode;
  closeButton?: ReactNode;
  title: string;
  maxFontSize?: string;
};

export const HeaderElement: React.FC<Props> = ({ index, title, initButton, secondaryButton, editButton, closeButton, maxFontSize = "120%" }) => {

  const [fontSize, setFontSize] = useState(maxFontSize);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const styles = window.getComputedStyle(el);
    const lineHeight = parseFloat(styles.lineHeight);
    const twoLineHeight = lineHeight * 2;
    console.log(twoLineHeight, el.scrollHeight)
    if (el.scrollHeight > twoLineHeight + 1) {
      setFontSize("100%");
      return;
    }
    setFontSize("120%");
  }, [title]);

  return (<>

    <div key={index} className={styles.header}>
      {initButton ?? <div></div>}
      {secondaryButton ?? <div></div>}
      <div ref={textRef} style={{ fontSize }} className={styles.title}>{title}</div>
      {editButton ?? <div></div>}
      {closeButton ?? <div></div>}
    </div>
  </>
  )
}