import { useRef, type RefObject } from "react";
import styles from "./PurpleStep1.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

type PurpleStep1Props = {
  container: RefObject<HTMLDivElement | null>;
};

export default function PurpleStep1({ container }: PurpleStep1Props) {
  const colorTitleContainer = useRef<HTMLDivElement>(null);
  const violet = useRef<HTMLHeadingElement>(null);
  const question = useRef<HTMLHeadingElement>(null);
  const questionText = useRef<HTMLSpanElement>(null);
  const le = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const splitText = new SplitText(violet.current, {
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

      const titleY = 350;
      const titleStagger = 0.02;
      const titleDuration = 0.5;

      tl.from(splitText.chars, {
        y: titleY,
        ease: "power3.out",
        stagger: titleStagger,
        duration: titleDuration,
      })
        .from(
          ".question",
          {
            y: 200,
            fontSize: "8rem",
            ease: "power3.out",
            duration: titleDuration,
          },
          "<",
        )
        .from(
          ".le",
          {
            y: 200,
            ease: "power3.out",
            duration: titleDuration,
          },
          "<",
        )
        .to(
          splitText.chars,
          {
            y: -titleY,
            ease: "power3.in",
            stagger: titleStagger,
            duration: titleDuration,
          },
          "+=1",
        )
        .to(
          ".question-text",
          {
            y: 200,
            ease: "power3.in",
            duration: titleDuration,
          },
          "<",
        )
        .to(
          ".le",
          {
            y: titleY,
            ease: "power3.in",
            duration: titleDuration,
          },
          "<",
        );
    },
    { scope: container },
  );

  return (
    <div className={styles.purple__title} ref={colorTitleContainer}>
      <div className={styles.purple__title__wrapper}>
        <div className={styles.purple__title__wrapper__top} ref={question}>
          <span ref={questionText}>Ça vous évoque quoi</span>
        </div>
        <div className={styles.purple__title__wrapper__text}>
          <span className={styles.purple__title__wrapper__text__left} ref={le}>
            Le
          </span>
          <h2
            className={styles.purple__title__wrapper__text__right}
            ref={violet}
          >
            Violet
          </h2>
        </div>
      </div>
    </div>
  );
}
