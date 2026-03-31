import { useRef, useEffect, useCallback, useState } from "react";
import styles from "./InfiniteColorRows.module.scss";

type Color = { name: string; hex: string; query: string };
type Photos = Record<string, string[]>;

const COLORS: Color[] = [
  { name: "Rouge",      hex: "#E63946", query: "red" },
  { name: "Corail",     hex: "#FF6347", query: "coral" },
  { name: "Orange",     hex: "#F4A261", query: "orange" },
  { name: "Jaune",      hex: "#F9C74F", query: "yellow" },
  { name: "Chartreuse", hex: "#A3CB38", query: "lime" },
  { name: "Vert",       hex: "#43AA8B", query: "green" },
  { name: "Turquoise",  hex: "#00BCD4", query: "teal" },
  { name: "Bleu",       hex: "#457B9D", query: "blue" },
  { name: "Indigo",     hex: "#3F51B5", query: "indigo" },
  { name: "Violet",     hex: "#7B2D8B", query: "purple" },
  { name: "Rose",       hex: "#F72585", query: "pink" },
  { name: "Marron",     hex: "#8B4513", query: "brown" },
  { name: "Beige",      hex: "#D4A574", query: "beige" },
  { name: "Gris",       hex: "#8D99AE", query: "grey" },
  { name: "Blanc",      hex: "#F8F9FA", query: "white" },
  { name: "Noir",       hex: "#1A1A2E", query: "black" },
];

const CLONES = 3;
const ITEMS = Array.from({ length: CLONES }, () => COLORS).flat();
const HEX_CHARS = "0123456789ABCDEF";
const ALPHA_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SCRAMBLE_FRAMES = 20;

export default function InfiniteColorRows() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const posRef      = useRef(0);
  const dragRef     = useRef({ active: false, startX: 0, startPos: 0 });
  const hexRafRef   = useRef(0);
  const nameRafRef  = useRef(0);

  const [photos, setPhotos]         = useState<Photos>({});
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [displayHex, setDisplayHex]   = useState("");
  const [displayName, setDisplayName] = useState("");

  const scramble = useCallback((
    target: string,
    setter: (s: string) => void,
    rafRef: React.MutableRefObject<number>,
  ) => {
    cancelAnimationFrame(rafRef.current);
    let frame = 0;
    function tick() {
      frame++;
      const revealed = Math.floor((frame / SCRAMBLE_FRAMES) * target.length);
      const text = target.split("").map((char, i) => {
        if (char === "#") return char;
        if (i < revealed) return char;
        const pool = /[0-9A-F]/i.test(char) && target.startsWith("#")
          ? HEX_CHARS
          : ALPHA_CHARS;
        return pool[Math.floor(Math.random() * pool.length)];
      }).join("");
      setter(text);
      if (frame < SCRAMBLE_FRAMES) rafRef.current = requestAnimationFrame(tick);
      else setter(target);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const activate = useCallback((color: Color) => {
    setActiveColor(color);
    scramble(color.hex, setDisplayHex, hexRafRef);
    scramble(color.name, setDisplayName, nameRafRef);
  }, [scramble]);

  const getItemWidth = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return 132;
    return first.offsetWidth + 12;
  }, []);

  const clampPosition = useCallback(() => {
    const itemW   = getItemWidth();
    const setSize = COLORS.length * itemW;
    if (posRef.current < -(CLONES - 1) * setSize) posRef.current += setSize;
    if (posRef.current > -setSize)                posRef.current -= setSize;
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
    posRef.current = dragRef.current.startPos + (e.clientX - dragRef.current.startX);
    clampPosition();
    applyTransform();
  }, [clampPosition, applyTransform]);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
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
    Promise.allSettled(
      COLORS.map(async ({ query }) => {
        try {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=3&orientation=portrait`,
            { headers: { Authorization: apiKey } }
          );
          if (!res.ok) return;
          const data = await res.json();
          setPhotos(prev => ({
            ...prev,
            [query]: data.photos.map((p: { src: { medium: string } }) => p.src.medium),
          }));
        } catch {}
      })
    );
  }, []);

  useEffect(() => {
    const itemW   = getItemWidth();
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

  useEffect(() => () => {
    cancelAnimationFrame(hexRafRef.current);
    cancelAnimationFrame(nameRafRef.current);
  }, []);

  return (
    <div className={styles.wrapper}>
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
              className={`${styles.item}${activeColor?.query === c.query ? ` ${styles.active}` : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`${c.name} ${c.hex}`}
              style={{ "--color": c.hex } as React.CSSProperties}
              onMouseEnter={() => activate(c)}
              onFocus={() => activate(c)}
              onKeyDown={onKeyDown}
            >
              <div className={styles.swatch} />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.info}${activeColor ? ` ${styles.infoVisible}` : ""}`}
        aria-live="polite"
        style={{ "--color": activeColor?.hex ?? "transparent" } as React.CSSProperties}
      >
        <div className={styles.infoText}>
          <span className={styles.hex}>{displayHex}</span>
          <span className={styles.colorName}>{displayName}</span>
        </div>
        <div className={styles.photos}>
          {(photos[activeColor?.query ?? ""] ?? []).map((src, j) => (
            <img key={`${activeColor?.query}-${j}`} src={src} alt={activeColor?.name} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}
