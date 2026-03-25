import { useState, useEffect } from "react";
import styles from "./ColorsList.module.scss";

const COLORS = [
  { name: "Rouge",  color: "#E63946", query: "red" },
  { name: "Orange", color: "#F4A261", query: "orange" },
  { name: "Jaune",  color: "#F9C74F", query: "yellow" },
  { name: "Vert",   color: "#43AA8B", query: "green" },
  { name: "Bleu",   color: "#457B9D", query: "blue" },
  { name: "Violet", color: "#7B2D8B", query: "purple" },
  { name: "Rose",   color: "#F72585", query: "pink" },
  { name: "Marron", color: "#8B4513", query: "brown" },
  { name: "Beige",  color: "#D4A574", query: "beige" },
  { name: "Gris",   color: "#8D99AE", query: "grey" },
  { name: "Noir",   color: "#1A1A2E", query: "black" },
  { name: "Blanc",  color: "#F8F9FA", query: "white" },
];

type Photos = Record<string, string[]>;

export default function ColorsList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photos>({});

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("API KEY -> "+ apiKey)
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
      console.log(data)
    });
  }, []);

  return (
    <div className={styles.colorsList}>
      {COLORS.map((c, i) => (
        <div
          key={i}
          className={`${styles.card} ${hovered === i ? styles.expanded : ""}`}
          style={{ "--color": c.color } as React.CSSProperties}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={styles.card__images}>
            {(photos[c.query] ?? []).map((src, j) => (
              <img key={j} src={src} alt="" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
