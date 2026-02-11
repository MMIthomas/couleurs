import { useEffect, useState, type RefObject } from "react";
import styles from "./ScrollBar.module.scss";

type ScrollBarProps = {
  container: RefObject<HTMLDivElement | null>;
};

export default function ScrollBar({ container }: ScrollBarProps) {
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current) return;

      const { top, height } = container.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = height - windowHeight;

      if (scrollableDistance <= 0) {
        setScrollBarWidth(100);
        return;
      }

      const scannedPercentage = (-top / scrollableDistance) * 100;

      setScrollBarWidth(Math.min(100, Math.max(0, scannedPercentage)));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [container]);

  return (
    <div className={styles.scrollBar}>
      <div
        className={styles.scrollBar__inner}
        style={{ width: `${scrollBarWidth}%` }}
      ></div>
    </div>
  );
}
