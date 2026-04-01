import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PurpleStep1, { type PurpleStep1Refs } from "./steps/PurpleStep1";
import PurpleStep2, { type PurpleStep2Refs } from "./steps/PurpleStep2";
import PurpleStep3, { type PurpleStep3Refs } from "./steps/PurpleStep3";
import { initStep1, buildStep1Enter, buildStep1Exit } from "./steps/PurpleStep1.anim";
import { initStep2, buildStep2Enter } from "./steps/PurpleStep2.anim";
import { initStep3, buildStep3Enter } from "./steps/PurpleStep3.anim";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const TOTAL_SCROLL = 500;

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);
  const stepsWrapper = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<PurpleStep1Refs>(null);
  const step2Ref = useRef<PurpleStep2Refs>(null);
  const step3Ref = useRef<PurpleStep3Refs>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const step1 = step1Ref.current!;
      const step2 = step2Ref.current!;
      const step3 = step3Ref.current!;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const split1 = initStep1(step1);
      const widths = initStep2(step2, reducedMotion);
      const split3 = initStep3(step3);

      const step3ProgressRef = { value: 1 };
      const step3Cards = [step3.wrapTL, step3.wrapTR, step3.wrapBL, step3.wrapBR];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsWrapper.current,
          start: "top top",
          end: `+=${TOTAL_SCROLL}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const isStep3 = self.progress >= step3ProgressRef.value;
            stepsWrapper.current!.setAttribute("data-step3-active", String(isStep3));
            step3Cards.forEach((el) => { el.tabIndex = isStep3 ? 0 : -1; });
          },
        },
      });

      buildStep1Enter(tl, split1, step1, reducedMotion);
      buildStep1Exit(tl, split1, step1, reducedMotion);
      buildStep2Enter(tl, step2, widths, reducedMotion);
      buildStep3Enter(tl, step3, split3, reducedMotion);

      step3ProgressRef.value = tl.labels["step3Enter"] / tl.duration();

      tl.to(scrollBarRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "step3Enter");

      return () => {
        split1.revert();
        split3.revert();
      };
    },
    { scope: container },
  );

  return (
    <section className={styles.purple} ref={container} aria-label="Le violet — émotions et associations">
      <div className={styles.purple__steps} ref={stepsWrapper}>
        <PurpleStep1 ref={step1Ref} />
        <PurpleStep2 ref={step2Ref} />
        <PurpleStep3 ref={step3Ref} />
      </div>
      <div ref={scrollBarRef} aria-hidden="true">
        <ScrollBar container={container} />
      </div>
    </section>
  );
}
