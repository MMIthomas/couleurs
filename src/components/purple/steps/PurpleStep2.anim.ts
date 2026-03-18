import gsap from "gsap";
import type { PurpleStep2Refs } from "./PurpleStep2";
import { ANIM1 } from "./PurpleStep1.anim";

export function initStep2(step2: PurpleStep2Refs): void {
  gsap.set(step2.container, { opacity: 0 });
  gsap.set(step2.flower, { x: -1000, y: 1000, rotation: 45, transformOrigin: "bottom left" });
  gsap.set(step2.pierreSticker, { y: "-120%" });

  // Animation vent — indépendante du scrub
  gsap.to(step2.flower, {
    rotation: 55,
    ease: "sine.inOut",
    duration: 1.8,
    repeat: -1,
    yoyo: true,
  });
}

export function buildStep2Enter(
  tl: gsap.core.Timeline,
  step2: PurpleStep2Refs,
): void {
  tl.addLabel("step2Enter", `step1Exit+=${ANIM1.duration}`)
    .set(step2.container, { opacity: 1 }, "step2Enter")
    .to(step2.flower, { x: 0, y: 0, ease: "power3.out", duration: ANIM1.duration }, "step2Enter")
    .from(step2.une,          { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter")
    .from(step2.fleurSticker, { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter+=0.08")
    .from(step2.questionMark, { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter+=0.16")
    .addLabel("pierreEnter", "step2Enter+=1")
    .to(step2.pierreSticker, { y: 0, ease: "power3.out", duration: 0.4 }, "pierreEnter");
}
