import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PurpleStep1, { type PurpleStep1Refs } from "./steps/PurpleStep1";
import PurpleStep2, { type PurpleStep2Refs } from "./steps/PurpleStep2";
import { initStep1, buildStep1Enter, buildStep1Exit } from "./steps/PurpleStep1.anim";
import { initStep2, buildStep2Enter } from "./steps/PurpleStep2.anim";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const TOTAL_SCROLL = 500;

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);
  const stepsWrapper = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<PurpleStep1Refs>(null);
  const step2Ref = useRef<PurpleStep2Refs>(null);

  useGSAP(
    () => {
      const step1 = step1Ref.current!;
      const step2 = step2Ref.current!;

      const split1 = initStep1(step1);
      const widths = initStep2(step2);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsWrapper.current,
          start: "top top",
          end: `+=${TOTAL_SCROLL}`,
          pin: true,
          scrub: 1,
        },
      });

      buildStep1Enter(tl, split1, step1);
      buildStep1Exit(tl, split1, step1);
      buildStep2Enter(tl, step2, widths);

      return () => {
        split1.revert();
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
