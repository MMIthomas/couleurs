import { useRef, useEffect, useCallback, useState } from "react";
import styles from "./InfiniteColorRows.module.scss";

type Photos = Record<string, string[]>;

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const [photos, setPhotos] = useState<Photos>({});

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

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const delta = e.clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + delta;
    clampPosition();
    applyTransform();
  }, [clampPosition, applyTransform]);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const itemW = getItemWidth();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      posRef.current -= itemW;
      clampPosition();
      applyTransform();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      posRef.current += itemW;
      clampPosition();
      applyTransform();
    }
  }, [getItemWidth, clampPosition, applyTransform]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    COLORS.forEach(async ({ query }) => {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=3&orientation=portrait`,
        { headers: { Authorization: apiKey } }
      );
      const data = await res.json();
      setPhotos((prev) => ({
        ...prev,
        [query]: data.photos.map((p: { src: { medium: string } }) => p.src.medium),
      }));
    });
  }, []);

  useEffect(() => {
    const itemW = getItemWidth();
    const setSize = COLORS.length * itemW;
    posRef.current = -setSize;
    applyTransform();
  }, [getItemWidth, applyTransform]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const LINE_HEIGHT = 40;
      const delta =
        e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT :
        e.deltaMode === 2 ? e.deltaY * (viewportRef.current?.clientHeight ?? 600) :
        e.deltaY;
      posRef.current -= delta * 1.2;
      clampPosition();
      applyTransform();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clampPosition, applyTransform]);

  return (
    <div
      className={styles.viewport}
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className={styles.track} ref={trackRef}>
        {ITEMS.map((c, i) => (
          <div
            key={`${i}-${c.query}`}
            className={styles.item}
            role="button"
            tabIndex={0}
            aria-label={`${c.name} ${c.hex}`}
            style={{ "--color": c.hex } as React.CSSProperties}
            onKeyDown={onKeyDown}
          >
            <div
              className={styles.swatch}
            />
            <div className={styles.panel}>
              <span className={styles.hex}>{c.hex}</span>
              <span className={styles.colorName}>{c.name}</span>
              <div className={styles.photos}>
                {(photos[c.query] ?? []).map((src, j) => (
                  <img key={j} src={src} alt={c.name} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
