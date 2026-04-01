import gsap from "gsap";
import type { PurpleStep2Refs } from "./PurpleStep2";
import { ANIM1 } from "./PurpleStep1.anim";

export interface Step2Widths {
  pierreWidth: number;
}

export function initStep2(step2: PurpleStep2Refs, reducedMotion: boolean): Step2Widths {
  gsap.set(step2.container, { opacity: 0 });
  gsap.set(step2.flower, { x: -1000, y: 1000, rotation: 45, transformOrigin: "bottom left" });
  gsap.set(step2.amethyst, { y: "-110vh" });
  // Pré-mesure AVANT tout transform
  const pierreWidth = step2.pierreSticker.offsetWidth;

  // Fixe la largeur du wrapper à celle de "fleur" (état initial)
  gsap.set(step2.stickerWrapper, { width: step2.fleurSticker.offsetWidth });
  // Stickers suivants démarrent en dessous du clip
  gsap.set(step2.pierreSticker,  { y: "100%", transformOrigin: "center center" });

  // Animation vent — indépendante du scrub
  if (!reducedMotion) {
    gsap.to(step2.flower, {
      rotation: 55,
      ease: "sine.inOut",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
    });
  }

  return { pierreWidth };
}

export function buildStep2Enter(
  tl: gsap.core.Timeline,
  step2: PurpleStep2Refs,
  widths: Step2Widths,
  reducedMotion: boolean,
): void {
  const d = reducedMotion ? 0.001 : ANIM1.duration;
  tl.addLabel("step2Enter", `step1Exit+=${ANIM1.duration}`)
    .set(step2.container, { opacity: 1 }, "step2Enter")
    .to(step2.flower, { x: 0, y: 0, ease: "power3.out", duration: d }, "step2Enter")
    .from(step2.une,          { y: "100%", ease: "power3.out", duration: reducedMotion ? 0.001 : 0.5 }, "step2Enter")
    .from(step2.fleurSticker, { y: "100%", ease: "power3.out", duration: reducedMotion ? 0.001 : 0.5 }, "step2Enter+=0.08")
    .from(step2.questionMark, { y: "100%", ease: "power3.out", duration: reducedMotion ? 0.001 : 0.5 }, "step2Enter+=0.16")

    .addLabel("stickerSwap1", "step2Enter+=1")
    .to(step2.stickerWrapper, { width: widths.pierreWidth,  duration: reducedMotion ? 0.001 : 0.4, ease: "power2.inOut" }, "stickerSwap1")
    .to(step2.fleurSticker,   { y: "-100%", ease: "power3.in",  duration: reducedMotion ? 0.001 : 0.3 }, "stickerSwap1")
    .to(step2.pierreSticker,  { y: "0%",    ease: "power3.out", duration: reducedMotion ? 0.001 : 0.3 }, "stickerSwap1+=0.05")
    .call((() => {
      let fired = false;
      return () => {
        if (fired) return;
        fired = true;
        gsap.to(step2.amethyst, {
          y: 0,
          duration: reducedMotion ? 0.001 : 1.4,
          ease: reducedMotion ? "none" : "bounce.out",
        });
      };
    })(), [], "stickerSwap1")

    // Zoom "pierre" → blanc couvre tout
    .addLabel("pierreZoom", "stickerSwap1+=0.8")
    .set([step2.stickerWrapper, step2.container], { overflow: "visible" }, "pierreZoom")
    .set(step2.fleurSticker, { opacity: 0 }, "pierreZoom")
    .to(step2.pierreSticker, {
      scale: 80,
      x: 2800,
      rotation: reducedMotion ? 0 : 90,
      borderRadius: 0,
      duration: reducedMotion ? 0.001 : 2,
      ease: reducedMotion ? "none" : "power2.in",
    }, "pierreZoom")
    .set(step2.pierreSticker, { opacity: 0 }, "pierreZoom+=2");
}
