import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./PurpleStep2.module.scss";
import lavande from "../../../assets/images/lavande.webp";
import pierre from "../../../assets/images/amethyste.png";
export interface PurpleStep2Refs {
  container: HTMLDivElement;
  text: HTMLParagraphElement;
  flower: HTMLImageElement;
  amethyst: HTMLImageElement;
  une: HTMLSpanElement;
  stickerWrapper: HTMLSpanElement;
  fleurSticker: HTMLSpanElement;
  pierreSticker: HTMLSpanElement;
  questionMark: HTMLSpanElement;
}

const PurpleStep2 = forwardRef<PurpleStep2Refs>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  const flower = useRef<HTMLImageElement>(null);
  const amethyst = useRef<HTMLImageElement>(null);

  const une = useRef<HTMLSpanElement>(null);
  const stickerWrapper = useRef<HTMLSpanElement>(null);

  const fleurSticker = useRef<HTMLSpanElement>(null);
  const pierreSticker = useRef<HTMLSpanElement>(null);

  const questionMark = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current!,
    text: text.current!,
    flower: flower.current!,
    amethyst: amethyst.current!,
    une: une.current!,
    stickerWrapper: stickerWrapper.current!,
    fleurSticker: fleurSticker.current!,
    pierreSticker: pierreSticker.current!,
    questionMark: questionMark.current!,
  }));

  return (
    <div className={styles.purple__step2} ref={containerRef}>
      <p
        className={styles.purple__step2__text}
        ref={text}
        aria-label="Une fleur ou une pierre ?"
      >
        <span className={styles.mask} aria-hidden="true">
          <span ref={une}>Une</span>
        </span>{" "}
        <span className={styles.stickerWrapper} ref={stickerWrapper} aria-hidden="true">
          <span className={styles.sticker} ref={fleurSticker}>
            fleur
          </span>
          <span
            className={`${styles.sticker} ${styles.stickerAbsolute}`}
            ref={pierreSticker}
          >
            pierre
          </span>
        </span>{" "}
        <span className={styles.mask} aria-hidden="true">
          <span ref={questionMark}>?</span>
        </span>
      </p>
      <img
        src={lavande}
        alt="Fleur de lavande"
        className={styles.purple__step2__flower}
        ref={flower}
      />
      <img
        src={pierre}
        alt="Pierre d'améthyste"
        className={styles.purple__step2__pierre}
        ref={amethyst}
      />
    </div>
  );
});

PurpleStep2.displayName = "PurpleStep2";

export default PurpleStep2;
