import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";

gsap.registerPlugin(useGSAP, SplitText);

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);
  const colorTitleContainer = useRef<HTMLDivElement>(null);
  const colorTitle = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const splitText = new SplitText(colorTitle.current, {
        type: "chars",
      });
      gsap.from(splitText.chars, {
        y: 150,
        duration: 1,
        ease: "power3.out",
        stagger: 0.02,
      });
    },
    { scope: container },
  );

  return (
    <section className={styles.purple} ref={container}>
      <div className={styles.purple__title} ref={colorTitleContainer}>
        <h2 ref={colorTitle}>Violet</h2>
      </div>
      <ScrollBar container={container} />
    </section>
  );
}
