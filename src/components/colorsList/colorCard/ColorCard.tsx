import { useRef } from "react";
import styles from "./ColorCard.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function ColorCard({ color, content }: { color: string, content: Array<string> }) {
  return (
    <section className={styles.colorCard}>
      <div className={styles.colorCard__swatch} style={{ backgroundColor: color }} />
      <article className={styles.colorCard__content}>
        {content.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </article>
    </section>
  );
}
