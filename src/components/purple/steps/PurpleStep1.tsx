import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./PurpleStep1.module.scss";

export interface PurpleStep1Refs {
  container: HTMLDivElement;
  violet: HTMLHeadingElement;
  questionWrapper: HTMLDivElement;
  questionText: HTMLSpanElement;
  le: HTMLSpanElement;
}

const PurpleStep1 = forwardRef<PurpleStep1Refs>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const violet = useRef<HTMLHeadingElement>(null);
  const questionWrapper = useRef<HTMLDivElement>(null);
  const questionText = useRef<HTMLSpanElement>(null);
  const le = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current!,
    violet: violet.current!,
    questionWrapper: questionWrapper.current!,
    questionText: questionText.current!,
    le: le.current!,
  }));

  return (
    <div className={styles.purple__title} ref={containerRef}>
      <div className={styles.purple__title__wrapper}>
        <div className={styles.purple__title__wrapper__top} ref={questionWrapper}>
          <span ref={questionText}>Ça vous évoque quoi</span>
        </div>
        <div className={styles.purple__title__wrapper__text}>
          <span className={styles.purple__title__wrapper__text__left} ref={le}>
            Le
          </span>
          <h2
            className={styles.purple__title__wrapper__text__right}
            ref={violet}
          >
            Violet
          </h2>
        </div>
      </div>
    </div>
  );
});

PurpleStep1.displayName = "PurpleStep1";

export default PurpleStep1;
