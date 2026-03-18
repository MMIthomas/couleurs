import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./PurpleStep2.module.scss";
import lavande from "../../../assets/images/lavande.webp";

export interface PurpleStep2Refs {
  container: HTMLDivElement;
  text: HTMLParagraphElement;
  flower: HTMLImageElement;
}

const PurpleStep2 = forwardRef<PurpleStep2Refs>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const flower = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current!,
    text: text.current!,
    flower: flower.current!,
  }));

  return (
    <div className={styles.purple__step2} ref={containerRef}>
      <p className={styles.purple__step2__text} ref={text}>
        Une fleur ?
      </p>
      <img
        src={lavande}
        alt="Lavande"
        className={styles.purple__step2__flower}
        ref={flower}
      />
    </div>
  );
});

PurpleStep2.displayName = "PurpleStep2";

export default PurpleStep2;
