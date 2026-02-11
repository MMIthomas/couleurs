import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);
  const colorTitleContainer = useRef<HTMLDivElement>(null);
  const colorTitle = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const splitText = new SplitText(colorTitle.current, {
        type: "chars",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () =>
            `+=${container.current ? container.current.offsetHeight / 6 : 0}`,
          pin: colorTitleContainer.current,
          scrub: 1,
          markers: true,
        },
      });

      tl.from(splitText.chars, {
        y: 150,
        ease: "power3.out",
        stagger: 0.05,
        duration: 1,
      }).to(
        splitText.chars,
        {
          y: 150,
          ease: "power3.in",
          stagger: 0.05,
          duration: 1,
        },
        "+=1",
      );
    },
    { scope: container },
  );

  return (
    <section className={styles.purple} ref={container}>
      <div className={styles.purple__title}>
        <div
          className={styles.purple__title__wrapper}
          ref={colorTitleContainer}
        >
          <h2 ref={colorTitle}>Violet</h2>
        </div>
      </div>
      <div className={styles.purple__motif}>
        <div className={styles.purple__motif__wrapper}>
          <span>Violet</span>
        </div>
      </div>
      <ScrollBar container={container} />
    </section>
  );
}
