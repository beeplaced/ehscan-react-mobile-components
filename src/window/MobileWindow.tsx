import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from '../style/window-mobile.module.css';

interface WindowSettings {
  title: string;
  header: string;
  footer?: string;
}
interface Props {
  overlayVisible: boolean;
  setOverlayVisible: (visible: boolean) => void;
  windowSettings: WindowSettings;
  header: React.ComponentType<{ closeWindow: () => void; title?: string }>;
  footer?: React.ComponentType;
  children: React.ReactNode;
}

export const Window: React.FC<Props> = ({
  overlayVisible,
  setOverlayVisible,
  windowSettings,
  header: Header,
  footer: Footer,
  children
}) => {

  const startY = useRef(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dragProgress = useRef(0);
  const isDragging = useRef(false);
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!overlayVisible) return
    setOpen(overlayVisible)
  }, [overlayVisible]);

  useEffect(() => {
    if (!windowSettings) return
    setTitle(windowSettings.title)
  }, [windowSettings]);

  const WindowHandler = () => {
    return (<>
      <div className={styles.windowHandleWrapper}
        onTouchStart={(e) => {
          startY.current = e.touches[0].clientY;
          isDragging.current = true;
        }}
        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {
          if (e.touches.length === 0 || !overlayRef.current || overlayRef.current === null) return;
          const clientY = e.touches[0].clientY;
          const delta = clientY - startY.current; // distance dragged downward
          if (delta > 0) {
            overlayRef.current.style.top = `${delta}px`;
            const overlayHeight = overlayRef.current.offsetHeight;
            const progress = Math.min(delta / overlayHeight, 1); // clamp to 1
            dragProgress.current = progress;
          }
        }}
        onTouchEnd={() => {
          if (!overlayRef.current || overlayRef.current === null) return;
          if (dragProgress.current >= 0.3) {
            setOpen(false);
            setOverlayVisible(false)
            return;
          }
          overlayRef.current.style = "top: 0";
        }}
      >
        <div className={styles.windowHandle} />
      </div>
    </>)
  }

  const closeWindow = () => {
    setOpen(false);
    setOverlayVisible(false);
  };

  if (!open) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div className={styles.windowOverlay} ref={overlayRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>
          <WindowHandler />
          <div ref={headerRef} className={styles.windowHeader}>
            <Header closeWindow={closeWindow} title={title} />
          </div>
          {children}
          {Footer && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}