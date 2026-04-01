import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import type { PurpleStep1Refs } from "./PurpleStep1";

const ANIM = { y: 350, stagger: 0.02, duration: 0.5 } as const;
export { ANIM as ANIM1 };

export function initStep1(step1: PurpleStep1Refs): SplitText {
  return new SplitText(step1.violet, { type: "chars" });
}

export function buildStep1Enter(
  tl: gsap.core.Timeline,
  split1: SplitText,
  step1: PurpleStep1Refs,
  reducedMotion: boolean,
): void {
  const d = reducedMotion ? 0.001 : ANIM.duration;
  const stagger = reducedMotion ? 0 : ANIM.stagger;
  tl.from(split1.chars, { y: ANIM.y, ease: "power3.out", stagger, duration: d })
    .from(step1.questionText, { y: 100, scale: 2, ease: "power3.out", duration: d }, "<")
    .from(step1.le, { y: 200, ease: "power3.out", duration: d }, "<");
}

export function buildStep1Exit(
  tl: gsap.core.Timeline,
  split1: SplitText,
  step1: PurpleStep1Refs,
  reducedMotion: boolean,
): void {
  const d = reducedMotion ? 0.001 : ANIM.duration;
  const stagger = reducedMotion ? 0 : ANIM.stagger;
  tl.addLabel("step1Exit", "+=1")
    .set(step1.questionWrapper, { overflow: "hidden" }, "step1Exit")
    .to(split1.chars, { y: -ANIM.y, ease: "power3.in", stagger, duration: d }, "step1Exit")
    .to(step1.questionText, { y: 200, ease: "power3.in", duration: d }, "<")
    .to(step1.le, { y: ANIM.y, ease: "power3.in", duration: d }, "<");
}
