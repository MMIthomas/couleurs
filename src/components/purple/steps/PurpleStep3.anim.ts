import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import type { PurpleStep3Refs } from "./PurpleStep3";

gsap.registerPlugin(SplitText);

export function initStep3(step3: PurpleStep3Refs): SplitText {
  gsap.set(step3.container, { opacity: 0 });
  gsap.set(step3.wrapTL, { x: -500, y: -400 });
  gsap.set(step3.wrapTR, { x:  500, y: -400 });
  gsap.set(step3.wrapBL, { x: -500, y:  400 });
  gsap.set(step3.wrapBR, { x:  500, y:  400 });

  const split = new SplitText(step3.textInner, { type: "chars" });
  gsap.set(split.chars, { y: 90 });
  return split;
}

export function buildStep3Enter(
  tl: gsap.core.Timeline,
  step3: PurpleStep3Refs,
  split: SplitText,
  reducedMotion: boolean,
): void {
  const d = reducedMotion ? 0.001 : 1.2;
  tl.addLabel("step3Enter", "pierreZoom+=2")
    .set(step3.container, { opacity: 1 }, "step3Enter")

    .to(split.chars, {
      y: 0,
      duration: reducedMotion ? 0.001 : 0.7,
      ease: "power3.out",
      stagger: reducedMotion ? 0 : 0.03,
    }, "step3Enter")

    .addLabel("step3Imgs", "step3Enter+=2")
    .to(step3.wrapTL, { x: 0, y: 0, duration: d, ease: "power3.out" }, "step3Imgs")
    .to(step3.wrapTR, { x: 0, y: 0, duration: d, ease: "power3.out" }, "step3Imgs+=0.08")
    .to(step3.wrapBL, { x: 0, y: 0, duration: d, ease: "power3.out" }, "step3Imgs+=0.16")
    .to(step3.wrapBR, { x: 0, y: 0, duration: d, ease: "power3.out" }, "step3Imgs+=0.24")

    .call(() => {
      if (reducedMotion) return;
      gsap.to(step3.wrapTL, { y: -14, rotation: "+=1.5", duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(step3.wrapTR, { y: -10, rotation: "-=2",   duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.4 });
      gsap.to(step3.wrapBL, { y:  12, rotation: "-=1.5", duration: 2.0, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.7 });
      gsap.to(step3.wrapBR, { y: -12, rotation: "+=2",   duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.2 });
    }, [], "step3Imgs+=1.2")

    .set({}, {}, "step3Imgs+=2");
}
