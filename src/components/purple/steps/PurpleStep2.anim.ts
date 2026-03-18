import gsap from "gsap";
import type { PurpleStep2Refs } from "./PurpleStep2";
import { ANIM1 } from "./PurpleStep1.anim";

export interface Step2Widths {
  pierreWidth: number;
  galaxieWidth: number;
}

export function initStep2(step2: PurpleStep2Refs): Step2Widths {
  gsap.set(step2.container, { opacity: 0 });
  gsap.set(step2.flower, { x: -1000, y: 1000, rotation: 45, transformOrigin: "bottom left" });

  // Pré-mesure AVANT tout transform
  const pierreWidth = step2.pierreSticker.offsetWidth;
  const galaxieWidth = step2.galaxieSticker.offsetWidth;

  // Fixe la largeur du wrapper à celle de "fleur" (état initial)
  gsap.set(step2.stickerWrapper, { width: step2.fleurSticker.offsetWidth });
  // Stickers suivants démarrent en dessous du clip
  gsap.set(step2.pierreSticker,  { y: "100%" });
  gsap.set(step2.galaxieSticker, { y: "100%" });

  // Animation vent — indépendante du scrub
  gsap.to(step2.flower, {
    rotation: 55,
    ease: "sine.inOut",
    duration: 1.8,
    repeat: -1,
    yoyo: true,
  });

  return { pierreWidth, galaxieWidth };
}

export function buildStep2Enter(
  tl: gsap.core.Timeline,
  step2: PurpleStep2Refs,
  widths: Step2Widths,
): void {
  tl.addLabel("step2Enter", `step1Exit+=${ANIM1.duration}`)
    .set(step2.container, { opacity: 1 }, "step2Enter")
    .to(step2.flower, { x: 0, y: 0, ease: "power3.out", duration: ANIM1.duration }, "step2Enter")
    .from(step2.une,          { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter")
    .from(step2.fleurSticker, { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter+=0.08")
    .from(step2.questionMark, { y: "100%", ease: "power3.out", duration: 0.5 }, "step2Enter+=0.16")

    // Swap 1 : fleur → pierre
    .addLabel("stickerSwap1", "step2Enter+=1")
    .to(step2.stickerWrapper, { width: widths.pierreWidth,  duration: 0.4, ease: "power2.inOut" }, "stickerSwap1")
    .to(step2.fleurSticker,   { y: "-100%", ease: "power3.in",  duration: 0.3 }, "stickerSwap1")
    .to(step2.pierreSticker,  { y: "0%",    ease: "power3.out", duration: 0.3 }, "stickerSwap1+=0.05")

    // Swap 2 : pierre → galaxie
    .addLabel("stickerSwap2", "stickerSwap1+=1")
    .to(step2.stickerWrapper, { width: widths.galaxieWidth, duration: 0.4, ease: "power2.inOut" }, "stickerSwap2")
    .to(step2.pierreSticker,  { y: "-100%", ease: "power3.in",  duration: 0.3 }, "stickerSwap2")
    .to(step2.galaxieSticker, { y: "0%",    ease: "power3.out", duration: 0.3 }, "stickerSwap2+=0.05");
}
