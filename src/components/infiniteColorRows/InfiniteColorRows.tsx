import { useRef, useEffect, useCallback } from "react";
import styles from "./InfiniteColorRows.module.scss";

const COLORS = [
  { name: "Rouge",  hex: "#E63946", query: "red" },
  { name: "Orange", hex: "#F4A261", query: "orange" },
  { name: "Jaune",  hex: "#F9C74F", query: "yellow" },
  { name: "Vert",   hex: "#43AA8B", query: "green" },
  { name: "Bleu",   hex: "#457B9D", query: "blue" },
  { name: "Violet", hex: "#7B2D8B", query: "purple" },
  { name: "Rose",   hex: "#F72585", query: "pink" },
  { name: "Marron", hex: "#8B4513", query: "brown" },
  { name: "Beige",  hex: "#D4A574", query: "beige" },
  { name: "Gris",   hex: "#8D99AE", query: "grey" },
  { name: "Noir",   hex: "#1A1A2E", query: "black" },
  { name: "Blanc",  hex: "#F8F9FA", query: "white" },
];

const CLONES = 3;
const ITEMS = Array.from({ length: CLONES }, () => COLORS).flat();

export default function InfiniteColorRows() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  const getItemWidth = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return 132;
    return first.offsetWidth + 12;
  }, []);

  const clampPosition = useCallback(() => {
    const itemW = getItemWidth();
    const setSize = COLORS.length * itemW;
    if (posRef.current < -(CLONES - 1) * setSize) posRef.current += setSize;
    if (posRef.current > -setSize) posRef.current -= setSize;
  }, [getItemWidth]);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  }, []);

  useEffect(() => {
    const itemW = getItemWidth();
    const setSize = COLORS.length * itemW;
    posRef.current = -setSize;
    applyTransform();
  }, [getItemWidth, applyTransform]);

  return (
    <div className={styles.viewport}>
      <div className={styles.track} ref={trackRef}>
        {ITEMS.map((c, i) => (
          <div
            key={`${i}-${c.query}`}
            className={styles.item}
            role="button"
            tabIndex={0}
            aria-label={`${c.name} ${c.hex}`}
            style={{ "--color": c.hex } as React.CSSProperties}
          >
            <div
              className={styles.swatch}
            />
            <div className={styles.panel}>
              <span className={styles.hex}>{c.hex}</span>
              <span className={styles.colorName}>{c.name}</span>
              <div className={styles.photos} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
