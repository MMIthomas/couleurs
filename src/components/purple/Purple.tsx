import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PurpleStep1, { type PurpleStep1Refs } from "./steps/PurpleStep1";
import PurpleStep2, { type PurpleStep2Refs } from "./steps/PurpleStep2";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const TOTAL_SCROLL = 500;
const ANIM1 = { y: 350, stagger: 0.02, duration: 0.5 } as const;
const ANIM2 = { y: 100, stagger: 0.03, duration: 0.5 } as const;

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);
  const stepsWrapper = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<PurpleStep1Refs>(null);
  const step2Ref = useRef<PurpleStep2Refs>(null);

  useGSAP(
    () => {
      const step1 = step1Ref.current!;
      const step2 = step2Ref.current!;

      gsap.set(step2.container, { opacity: 0 });

      // Animation vent — indépendante du scrub
      gsap.set(step2.flower, { x: -1000, y: 1000, rotation: 45, transformOrigin: "bottom left" });
      gsap.to(step2.flower, {
        rotation: 55,
        ease: "sine.inOut",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
      });

      const split1 = new SplitText(step1.violet, { type: "chars" });
      const split2 = new SplitText(step2.text, { type: "words", mask: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsWrapper.current,
          start: "top top",
          end: `+=${TOTAL_SCROLL}`,
          pin: true,
          scrub: 1,
        },
      });

      // --- Step1 entrée ---
      tl.from(split1.chars, {
        y: ANIM1.y,
        ease: "power3.out",
        stagger: ANIM1.stagger,
        duration: ANIM1.duration,
      })
        .from(
          step1.questionText,
          { y: 100, scale: 2, ease: "power3.out", duration: ANIM1.duration },
          "<",
        )
        .from(
          step1.le,
          { y: 200, ease: "power3.out", duration: ANIM1.duration },
          "<",
        )

        // --- Step1 sortie + Step2 apparition simultanées ---
        .addLabel("step1Exit", "+=1")
        .set(step1.questionWrapper, { overflow: "hidden" }, "step1Exit")
        .to(
          split1.chars,
          {
            y: -ANIM1.y,
            ease: "power3.in",
            stagger: ANIM1.stagger,
            duration: ANIM1.duration,
          },
          "step1Exit",
        )
        .to(
          step1.questionText,
          { y: 200, ease: "power3.in", duration: ANIM1.duration },
          "<",
        )
        .to(
          step1.le,
          { y: ANIM1.y, ease: "power3.in", duration: ANIM1.duration },
          "<",
        )
        // --- Step2 entrée — après la fin complète de l'exit Step1 ---
        .addLabel("step2Enter", `step1Exit+=${ANIM1.duration}`)
        .set(step2.container, { opacity: 1 }, "step2Enter")
        .to(
          step2.flower,
          { x: 0, y: 0, ease: "power3.out", duration: ANIM1.duration },
          "step2Enter",
        )
        .from(
          split2.words,
          { y: "100%", ease: "power3.out", stagger: 0.08, duration: 0.5 },
          "step2Enter",
        )

      return () => {
        split1.revert();
        split2.revert();
      };
    },
    { scope: container },
  );

  return (
    <section className={styles.purple} ref={container}>
      <div className={styles.purple__steps} ref={stepsWrapper}>
        <PurpleStep1 ref={step1Ref} />
        <PurpleStep2 ref={step2Ref} />
      </div>
      <ScrollBar container={container} />
    </section>
  );
}
