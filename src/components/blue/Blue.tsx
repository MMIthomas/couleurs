import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Blue.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Blue() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const container = containerRef.current;
    
    // Calculating the distance to scroll horizontally
    const getScrollWidth = () => container.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollWidth()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(container, {
      x: () => -getScrollWidth(),
      ease: "none",
    });

    // Deformation (Skew) effect based on velocity
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(container, "skewX", "deg");
    const clamp = gsap.utils.clamp(-20, 20); // max 20 degrees skew

    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -400);
        // only update if it's significantly different
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.blue}>
      <div ref={containerRef} className={styles.blue__container}>
        <h2 className={styles.blue__title}>Bleu</h2>
        <h2 className={styles.blue__title}>Déformé</h2>
        <h2 className={styles.blue__title}>Horizontal</h2>
        <h2 className={styles.blue__title}>GSAP</h2>
        <h2 className={styles.blue__title}>Smooth</h2>
        <h2 className={styles.blue__title}>Scroll</h2>
        <h2 className={styles.blue__title}>End</h2>
      </div>
    </section>
  );
}
