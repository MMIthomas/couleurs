import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./PurpleStep3.module.scss";
import imgLandscape from "../../../assets/images/landscape.png";
import imgArt from "../../../assets/images/art.avif";
import imgRetro from "../../../assets/images/retro_vibe.jpg";

export interface PurpleStep3Refs {
  container: HTMLDivElement;
  textInner: HTMLSpanElement;
  wrapTL: HTMLDivElement;
  wrapTR: HTMLDivElement;
  wrapBL: HTMLDivElement;
  wrapBR: HTMLDivElement;
}

const IMAGES = [
  { src: imgLandscape, text: "Le violet des paysages du monde des rêves" },
  { src: imgArt, text: "Le violet a une puissance émotionnelle unique. On ressent cela dans l'art" },
  { src: imgRetro, text: "Les néons violets de la nuit synthwave, les souvenirs d'une époque révolue" },
  { src: "https://cdn.stocksnap.io/img-thumbs/960w/purple-pink_OPUZIGPN2J.jpg", text: "Quand la couleur jaillit sans retenue, elle révèle ce que les mots ne peuvent pas dire" },
];

const CORNERS: { wrapClass: string; imgClass: string; origin: string }[] = [
  { wrapClass: styles.wrapTL, imgClass: styles.imgTL, origin: "top left" },
  { wrapClass: styles.wrapTR, imgClass: styles.imgTR, origin: "top right" },
  { wrapClass: styles.wrapBL, imgClass: styles.imgBL, origin: "bottom left" },
  { wrapClass: styles.wrapBR, imgClass: styles.imgBR, origin: "bottom right" },
];

const PurpleStep3 = forwardRef<PurpleStep3Refs>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textInner    = useRef<HTMLSpanElement>(null);
  const wrapTL = useRef<HTMLDivElement>(null);
  const wrapTR = useRef<HTMLDivElement>(null);
  const wrapBL = useRef<HTMLDivElement>(null);
  const wrapBR = useRef<HTMLDivElement>(null);

  const wrapRefs = [wrapTL, wrapTR, wrapBL, wrapBR];

  useImperativeHandle(ref, () => ({
    container: containerRef.current!,
    textInner: textInner.current!,
    wrapTL: wrapTL.current!,
    wrapTR: wrapTR.current!,
    wrapBL: wrapBL.current!,
    wrapBR: wrapBR.current!,
  }));

  const { contextSafe } = useGSAP(() => {
    gsap.set(`.${styles.overlayText}`, { y: 20, opacity: 0 });
  }, { scope: containerRef });

  const handleEnter = contextSafe((wrap: HTMLDivElement, origin: string) => {
    const overlay = wrap.querySelector<HTMLElement>(`.${styles.overlay}`)!;
    const text    = wrap.querySelector<HTMLElement>(`.${styles.overlayText}`)!;
    gsap.set(wrap, { zIndex: 4 });
    gsap.to(wrap,    { scale: 1.12, duration: 0.5, ease: "power2.out", transformOrigin: origin });
    gsap.to(overlay, { clipPath: "inset(0% 0 0% 0 round 16px)", duration: 0.55, ease: "power3.out" });
    gsap.to(text,    { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.12 });
  });

  const handleLeave = contextSafe((wrap: HTMLDivElement, origin: string) => {
    const overlay = wrap.querySelector<HTMLElement>(`.${styles.overlay}`)!;
    const text    = wrap.querySelector<HTMLElement>(`.${styles.overlayText}`)!;
    gsap.to(wrap,    { scale: 1, duration: 0.55, ease: "power3.inOut", transformOrigin: origin,
                       onComplete: () => { gsap.set(wrap, { zIndex: 1 }); } });
    gsap.to(overlay, { clipPath: "inset(100% 0 0% 0 round 16px)", duration: 0.45, ease: "power2.in" });
    gsap.to(text,    { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" });
  });

  return (
    <div className={styles.purple__step3} ref={containerRef}>
      <p className={styles.purple__step3__text}>
        <span className={styles.mask}>
          <span ref={textInner}>des émotions</span>
        </span>
      </p>

      {CORNERS.map(({ wrapClass, imgClass, origin }, i) => (
        <div
          key={i}
          className={`${styles.imgWrapper} ${wrapClass}`}
          ref={wrapRefs[i]}
          role="button"
          tabIndex={-1}
          aria-label={IMAGES[i].text}
          onMouseEnter={() => handleEnter(wrapRefs[i].current!, origin)}
          onMouseLeave={() => handleLeave(wrapRefs[i].current!, origin)}
          onFocus={() => handleEnter(wrapRefs[i].current!, origin)}
          onBlur={() => handleLeave(wrapRefs[i].current!, origin)}
          onTouchStart={() => handleEnter(wrapRefs[i].current!, origin)}
          onTouchEnd={() => handleLeave(wrapRefs[i].current!, origin)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleEnter(wrapRefs[i].current!, origin);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLeave(wrapRefs[i].current!, origin);
            }
          }}
        >
          <img
            src={IMAGES[i].src}
            alt=""
            aria-hidden="true"
            className={`${styles.img} ${imgClass}`}
          />
          <div className={styles.overlay} aria-hidden="true">
            <p className={styles.overlayText}>{IMAGES[i].text}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

PurpleStep3.displayName = "PurpleStep3";

export default PurpleStep3;
