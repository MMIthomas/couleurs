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
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
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
