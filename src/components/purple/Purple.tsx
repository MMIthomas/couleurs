import { useRef } from "react";
import styles from "./Purple.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollBar from "./scrollBar/ScrollBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PurpleStep1 from "./steps/PurpleStep1";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Purple() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.purple} ref={container}>
      <PurpleStep1 container={container} />
      <div className={styles.purple__step2}>
        <h3>Peut-être une fleur ?</h3>
      </div>
      <ScrollBar container={container} />
    </section>
  );
}
