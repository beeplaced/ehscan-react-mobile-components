import React, { FC } from "react";
import styles from "../style/popup.module.css";

type PopUpProps = {
  popupVisible: boolean;
  setPopupVisible: (visible: boolean) => void;
  title: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

export const PopUp: FC<PopUpProps> = ({ popupVisible, setPopupVisible, title, body, footer }) => {

  if (!popupVisible) return null;

  return (
    <div className={styles.backdrop} onClick={() => setPopupVisible(false)}>
      <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupBoxInner}>
          <div className={styles.popupBoxTitle}>
            <div className={styles.popupBoxTitleMain}>{title}</div>
            <button className={styles.closeButton} onClick={() => setPopupVisible(false)}>
              <svg className={styles.closeSVG} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightslategrey"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
            </button>
          </div>
          {body && <div>{body}</div>}
          {footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};
