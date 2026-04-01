import { useRef, useEffect, useCallback, useState } from "react";
import styles from "./InfiniteColorRows.module.scss";

type Color = { name: string; hex: string; query: string };
type Photos = Record<string, string[]>;

const COLORS: Color[] = [
  { name: "Bordeaux",   hex: "#6B0F1A", query: "burgundy" },
  { name: "Cramoisi",   hex: "#DC143C", query: "crimson" },
  { name: "Rouge",      hex: "#E63946", query: "red" },
  { name: "Vermillon",  hex: "#FF4500", query: "vermilion" },
  { name: "Corail",     hex: "#FF6347", query: "coral" },
  { name: "Saumon",     hex: "#FA8072", query: "salmon" },
  { name: "Pêche",      hex: "#FFBE98", query: "peach" },
  { name: "Mandarine",  hex: "#FF8C00", query: "tangerine" },
  { name: "Orange",     hex: "#F4A261", query: "orange" },
  { name: "Ambre",      hex: "#FFBF00", query: "amber" },
  { name: "Jaune",      hex: "#F9C74F", query: "yellow" },
  { name: "Citron",     hex: "#E8F000", query: "lemon" },
  { name: "Chartreuse", hex: "#A3CB38", query: "lime" },
  { name: "Olive",      hex: "#808000", query: "olive" },
  { name: "Sauge",      hex: "#87AE73", query: "sage" },
  { name: "Vert",       hex: "#43AA8B", query: "green" },
  { name: "Émeraude",   hex: "#50C878", query: "emerald" },
  { name: "Forêt",      hex: "#228B22", query: "forest" },
  { name: "Menthe",     hex: "#3EB489", query: "mint" },
  { name: "Turquoise",  hex: "#00BCD4", query: "teal" },
  { name: "Cyan",       hex: "#00CED1", query: "cyan" },
  { name: "Ciel",       hex: "#87CEEB", query: "sky" },
  { name: "Bleu",       hex: "#457B9D", query: "blue" },
  { name: "Cobalt",     hex: "#0047AB", query: "cobalt" },
  { name: "Marine",     hex: "#1F305E", query: "navy" },
  { name: "Indigo",     hex: "#3F51B5", query: "indigo" },
  { name: "Pervenche",  hex: "#9B9FE4", query: "periwinkle" },
  { name: "Lavande",    hex: "#967BB6", query: "lavender" },
  { name: "Violet",     hex: "#7B2D8B", query: "purple" },
  { name: "Aubergine",  hex: "#614051", query: "eggplant" },
  { name: "Mauve",      hex: "#C8A2C8", query: "mauve" },
  { name: "Rose pâle",  hex: "#FFB6C1", query: "light pink" },
  { name: "Framboise",  hex: "#E30B5C", query: "raspberry" },
  { name: "Rose",       hex: "#F72585", query: "pink" },
  { name: "Fuchsia",    hex: "#C1007A", query: "fuchsia" },
  { name: "Ivoire",     hex: "#FFFFF0", query: "ivory" },
  { name: "Blanc",      hex: "#F8F9FA", query: "white" },
  { name: "Crème",      hex: "#FFFDD0", query: "cream" },
  { name: "Beige",      hex: "#D4A574", query: "beige" },
  { name: "Sable",      hex: "#C2B280", query: "sand" },
  { name: "Caramel",    hex: "#C68642", query: "caramel" },
  { name: "Marron",     hex: "#8B4513", query: "brown" },
  { name: "Chocolat",   hex: "#3D1C02", query: "chocolate" },
  { name: "Gris clair", hex: "#C8D0D8", query: "light grey" },
  { name: "Gris",       hex: "#8D99AE", query: "grey" },
  { name: "Ardoise",    hex: "#4A4E69", query: "slate" },
  { name: "Anthracite", hex: "#363636", query: "anthracite" },
  { name: "Noir",       hex: "#1A1A2E", query: "black" },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToComplement(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const hComp = (Math.round(h * 360) + 180) % 360;
  return `hsl(${hComp}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CLONES = 3;
const ITEMS = Array.from({ length: CLONES }, () => COLORS).flat();
const HEX_CHARS   = "0123456789ABCDEF";
const ALPHA_CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SCRAMBLE_FRAMES = 20;

export default function InfiniteColorRows() {
  const trackRef          = useRef<HTMLDivElement>(null);
  const viewportRef       = useRef<HTMLDivElement>(null);
  const infoRef           = useRef<HTMLDivElement>(null);
  const activeItemRef     = useRef<HTMLElement | null>(null);
  const posRef            = useRef(0);
  const dragRef           = useRef({ active: false, startX: 0, startPos: 0 });
  const hexRafRef         = useRef(0);
  const nameRafRef        = useRef(0);
  const scrollRafRef      = useRef(0);

  const lastQueryRef  = useRef("");

  const [photos, setPhotos]           = useState<Photos>({});
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [displayHex, setDisplayHex]   = useState("");
  const [displayName, setDisplayName] = useState("");
  const [copiedKey, setCopiedKey]     = useState<string | null>(null);

  const scramble = useCallback((
    target: string,
    setter: (s: string) => void,
    rafRef: React.RefObject<number>,
  ) => {
    cancelAnimationFrame(rafRef.current);
    let frame = 0;
    function tick() {
      frame++;
      const revealed = Math.floor((frame / SCRAMBLE_FRAMES) * target.length);
      const text = target.split("").map((char, i) => {
        if (char === "#") return char;
        if (i < revealed) return char;
        const pool = target.startsWith("#") ? HEX_CHARS : ALPHA_CHARS;
        return pool[Math.floor(Math.random() * pool.length)];
      }).join("");
      setter(text);
      if (frame < SCRAMBLE_FRAMES) rafRef.current = requestAnimationFrame(tick);
      else setter(target);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const getItemWidth = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return 172;
    return first.offsetWidth + 12;
  }, []);

  const clampPosition = useCallback(() => {
    const itemW   = getItemWidth();
    const setSize = COLORS.length * itemW;
    if (posRef.current < -(CLONES - 1) * setSize) posRef.current += setSize;
    if (posRef.current > -setSize)                posRef.current -= setSize;
  }, [getItemWidth]);

  const applyTransform = useCallback(() => {
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  }, []);

  const scrollTo = useCallback((target: number) => {
    cancelAnimationFrame(scrollRafRef.current);
    function lerp() {
      const diff = target - posRef.current;
      if (Math.abs(diff) < 0.5) {
        posRef.current = target;
        applyTransform();
        return;
      }
      posRef.current += diff * 0.1;
      applyTransform();
      scrollRafRef.current = requestAnimationFrame(lerp);
    }
    scrollRafRef.current = requestAnimationFrame(lerp);
  }, [applyTransform]);

  const computeScrollTarget = useCallback((itemIdx: number): number => {
    const itemW = getItemWidth();
    const vw    = viewportRef.current?.clientWidth ?? 0;
    const setSize = COLORS.length * itemW;
    const base  = vw / 2 - 6 - (itemIdx + 0.5) * itemW;
    const candidates = [base - setSize, base, base + setSize];
    return candidates.reduce((best, c) =>
      Math.abs(c - posRef.current) < Math.abs(best - posRef.current) ? c : best
    );
  }, [getItemWidth]);

  const copy = useCallback((value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }, []);

  const showColor = useCallback((color: Color) => {
    setActiveColor(color);
    scramble(color.hex, setDisplayHex, hexRafRef);
    scramble(color.name, setDisplayName, nameRafRef);
    document.documentElement.style.setProperty("--page-color", color.hex);
    document.documentElement.style.setProperty("--page-complement", hexToComplement(color.hex));
  }, [scramble]);

  const colorAtCenter = useCallback((): Color | null => {
    const itemW = getItemWidth();
    const vw    = viewportRef.current?.clientWidth ?? 0;
    const centerX = -posRef.current + vw / 2;
    const idx = Math.round((centerX - 6) / itemW - 0.5);
    const clamped = ((idx % ITEMS.length) + ITEMS.length) % ITEMS.length;
    return ITEMS[clamped] ?? null;
  }, [getItemWidth]);

  const activate = useCallback((color: Color) => {
    if (dragRef.current.active) return;
    const itemW = getItemWidth();
    const vw    = viewportRef.current?.clientWidth ?? 0;
    const currentCenter = (-posRef.current + vw / 2) / itemW;

    let nearestIdx = 0;
    let minDist    = Infinity;
    ITEMS.forEach((item, i) => {
      if (item.query === color.query) {
        const dist = Math.abs(i - currentCenter);
        if (dist < minDist) { minDist = dist; nearestIdx = i; }
      }
    });

    lastQueryRef.current = color.query;
    showColor(color);
    scrollTo(computeScrollTarget(nearestIdx));
  }, [showColor, scrollTo, computeScrollTarget, getItemWidth]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    cancelAnimationFrame(scrollRafRef.current);
    dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    posRef.current = dragRef.current.startPos + (e.clientX - dragRef.current.startX);
    clampPosition();
    applyTransform();
    const c = colorAtCenter();
    if (c && c.query !== lastQueryRef.current) {
      lastQueryRef.current = c.query;
      showColor(c);
    }
  }, [clampPosition, applyTransform, colorAtCenter, showColor]);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const itemW = getItemWidth();
    if (e.key === "ArrowRight") {
      e.preventDefault();
      cancelAnimationFrame(scrollRafRef.current);
      posRef.current -= itemW;
      clampPosition();
      applyTransform();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cancelAnimationFrame(scrollRafRef.current);
      posRef.current += itemW;
      clampPosition();
      applyTransform();
    } else if (e.key === "Enter") {
      e.preventDefault();
      infoRef.current?.querySelector<HTMLElement>("button")?.focus();
      return;
    } else {
      return;
    }
    const c = colorAtCenter();
    if (c && c.query !== lastQueryRef.current) {
      lastQueryRef.current = c.query;
      showColor(c);
    }
  }, [getItemWidth, clampPosition, applyTransform, colorAtCenter, showColor]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    Promise.allSettled(
      COLORS.map(async ({ query }) => {
        try {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=6&orientation=portrait`,
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
    const c = colorAtCenter();
    if (c) {
      lastQueryRef.current = c.query;
      showColor(c);
    }
  }, [getItemWidth, applyTransform, colorAtCenter, showColor]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimationFrame(scrollRafRef.current);
      const LINE_HEIGHT = 40;
      const delta =
        e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT :
        e.deltaMode === 2 ? e.deltaY * (viewportRef.current?.clientHeight ?? 600) :
        e.deltaY;
      posRef.current -= delta * 1.2;
      clampPosition();
      applyTransform();
      const c = colorAtCenter();
      if (c && c.query !== lastQueryRef.current) {
        lastQueryRef.current = c.query;
        showColor(c);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [clampPosition, applyTransform, colorAtCenter, showColor]);

  useEffect(() => () => {
    cancelAnimationFrame(hexRafRef.current);
    cancelAnimationFrame(nameRafRef.current);
    cancelAnimationFrame(scrollRafRef.current);
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{ "--complement": activeColor ? hexToComplement(activeColor.hex) : "transparent" } as React.CSSProperties}
    >
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
              onFocus={(e) => { activeItemRef.current = e.currentTarget; activate(c); }}
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
        ref={infoRef}
        style={{ "--color": activeColor?.hex ?? "transparent" } as React.CSSProperties}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            const target = activeItemRef.current
              ?? trackRef.current?.querySelector<HTMLElement>("[tabindex='0']");
            target?.focus();
          }
        }}
      >
        <div className={styles.infoText}>
          <div className={styles.hexRow}>
            <span className={styles.hex}>{displayHex}</span>
            <button
              className={styles.copyBtn}
              onClick={() => activeColor && copy(activeColor.hex, "hex")}
              aria-label="Copier HEX"
              tabIndex={activeColor ? 0 : -1}
            >
              {copiedKey === "hex" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <span className={styles.colorName}>{displayName}</span>
          {activeColor && (
            <div className={styles.variants}>
              {([
                { label: "RGB", value: hexToRgb(activeColor.hex), key: "rgb" },
                { label: "HSL", value: hexToHsl(activeColor.hex), key: "hsl" },
              ] as const).map(({ label, value, key }) => (
                <div key={key} className={styles.variantRow}>
                  <span className={styles.variantLabel}>{label}</span>
                  <span className={styles.variantValue}>{value}</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => copy(value, key)}
                    aria-label={`Copier ${label}`}
                    tabIndex={activeColor ? 0 : -1}
                  >
                    {copiedKey === key ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              ))}
            </div>
          )}
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
