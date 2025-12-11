import React, { useEffect, useState } from "react";
import styles from '../style/fab.module.css';

type FabButton = {
  title: string;
  onClick: () => void;
  y?: number; // optional, if you want per-button translateY
};

type FABProps = {
  buttons: FabButton[];
};

export const FAB: React.FC<FABProps> = ({ buttons }) => {
  const [open, setOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
    // Allow DOM to render before adding the open class
    setTimeout(() => setFadeIn(!fadeIn), 10);
  };

  useEffect(() => {
    if (!open) setFadeIn(false);
  }, [open]);

  const FabToggle = () => {
    return (
      <button onClick={toggleMenu}
        className={styles.fabMain}
        aria-label={fadeIn ? "Close menu" : "Open menu"} >
        <svg className={`${styles.fabIcon} ${fadeIn ? styles.open : ""}`}
          width="24"
          height="24"
          viewBox="0 0 24 24" >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    );
  }

  return (
    <div className={styles.fabMenu}>
      {/* Sub-buttons */}
      {open && buttons.map((btn, index) => {
        const translateY = btn.y ?? -(index + 1) * 60;
        return (
          <div
            key={index}
            className={`${styles.fabSub} ${fadeIn ? styles.open : ""}`}
            onClick={btn.onClick}
            style={{
              transform: fadeIn ? `translateY(${translateY}px) scale(1)` : "translateY(0) scale(0)",
              opacity: fadeIn ? 1 : 0,
            }}
          >
            {btn.title}
          </div>
        );
      })}
      {/* Main FAB */}
      <FabToggle />
    </div>
  );
}