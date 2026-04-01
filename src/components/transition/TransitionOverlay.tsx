import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransition } from "../../context/TransitionContext";
import styles from "./TransitionOverlay.module.scss";

const COLORS = [
  "#E84040", // rouge
  "#F47C38", // orange
  "#F5D040", // jaune
  "#4DC85A", // vert
  "#3BADD4", // cyan
  "#4A67E3", // bleu
  "#8B45D4", // violet
];

const N = COLORS.length;

export default function TransitionOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const { registerCover } = useTransition();

  const coverCbRef = useRef<(path: string) => void>(() => {});

  const { contextSafe } = useGSAP(() => {
    gsap.set(barsRef.current, { height: 0 });
  }, { scope: containerRef });

  const uncover = contextSafe(() => {
    gsap.to([...barsRef.current].reverse(), {
      height: 0,
      duration: 0.4,
      ease: "power3.in",
      stagger: 0.05,
    });
  });

  const cover = contextSafe((path: string) => {
    gsap.to(barsRef.current, {
      height: "100%",
      duration: 0.2,
      ease: "power2.inOut",
      stagger: 0.05,
      onComplete: () => {
        navigate(path);
        setTimeout(() => {
          uncover();
          document.querySelector<HTMLElement>("#main-content")?.focus();
        }, 80);
      },
    });
  });

  coverCbRef.current = cover;

  useEffect(() => {
    registerCover((path: string) => coverCbRef.current(path));
  }, [registerCover]);

  return (
    <div className={styles.overlayWrapper} aria-hidden="true">
      <div className={styles.barsContainer} ref={containerRef}>
        {COLORS.map((color, i) => (
          <div
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            className={styles.bar}
            style={{
              backgroundColor: color,
              left: `${(100 / N) * i}%`,
              width: `${100 / N}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
