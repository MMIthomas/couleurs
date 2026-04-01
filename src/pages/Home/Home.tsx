import React, { useRef, useEffect } from "react";
import TransitionLink from "../../components/transition/TransitionLink";
import styles from "./Home.module.scss";
import Purple from "../../components/purple/Purple.tsx";
import Red from "../../components/red/Red.tsx";
import Blue from "../../components/blue/Blue.tsx";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const discoverBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || e.shiftKey) return;

      const step3Active =
        !!containerRef.current?.querySelector('[data-step3-active="true"]');

      if (!step3Active) {
        e.preventDefault();
        discoverBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <main id="main-content" tabIndex={-1}>
        <Purple />
        <Red />
        <Blue />
      </main>
      <TransitionLink ref={discoverBtnRef} to="/discover" className={styles.discoverBtn} aria-label="Voir les couleurs">
        Voir les couleurs
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </TransitionLink>
    </div>
  );
};

export default Home;
