import { useRef, useEffect } from "react";
import styles from "./Blue.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    id: "lapis",
    title: "L'Origine",
    year: "-3000",
    era: "Antiquité",
    desc: "Longtemps ignoré des textes et des arts, le bleu naît de la rareté absolue du Lapis-lazuli. Une couleur de l'ombre, discrète et précieuse, extraite des montagnes d'Afghanistan.",
    symbol: "◈",
    theme: styles.theme_lapis,
  },
  {
    id: "woad",
    title: "Le Barbare",
    year: "-500",
    era: "Fer",
    desc: "Les Celtes et les Gaulois teintent leurs corps au pastel des champs. Le bleu woad, primitif et violent, effraye l'ennemi. C'est la couleur des marges, de ceux que Rome méprise.",
    symbol: "⟁",
    theme: styles.theme_woad,
  },
  {
    id: "royal",
    title: "Le Sacré",
    year: "1200",
    era: "Médiéval",
    desc: "Au XIIe siècle, il se pare d'or pour devenir la couleur de la Vierge puis des rois. Le bleu s'installe enfin au sommet de la hiérarchie céleste et royale.",
    symbol: "✦",
    theme: styles.theme_royal,
  },
  {
    id: "denim",
    title: "Le Peuple",
    year: "1873",
    era: "Industriel",
    desc: "Avec l'indigo et l'avènement du Denim, le bleu se démocratise. C'est désormais la couleur du travail, du repos et du rêve universel — porté par des millions de mains calleuses.",
    symbol: "▨",
    theme: styles.theme_denim,
  },
  {
    id: "klein",
    title: "L'Absolu",
    year: "1960",
    era: "Moderne",
    desc: "Yves Klein brevète l'International Klein Blue. Une couleur si pure qu'elle abolit la forme. Le bleu cesse d'être une teinte — il devient une expérience spirituelle, immatérielle.",
    symbol: "○",
    theme: styles.theme_klein,
  },
  {
    id: "navy",
    title: "L'Ordre",
    year: "2024",
    era: "Numérique",
    desc: "Aujourd'hui, il incarne la sécurité, la stabilité et l'autorité collective. Sur chaque écran, dans chaque logo, le bleu rassure davantage qu'il ne divise.",
    symbol: "⬡",
    theme: styles.theme_navy,
  },
];

const TOTAL_PANELS = 1 + chapters.length; // 7

export default function Blue() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    const prog = progressRef.current;
    if (!outer || !sticky || !wrapper || !prog) return;

    // Suivi des animations contenu
    const played = new Array(chapters.length).fill(false);
    const reversed = new Array(chapters.length).fill(false);

    // Pré-sélectionne les éléments de chaque chapitre
    const chapterEls = chapters.map((_, i) => {
      const sec = wrapper.querySelectorAll(`.${styles.section}`)[i + 1] as HTMLElement;
      if (!sec) return null;
      return {
        chars: Array.from(sec.querySelectorAll(`.${styles.char}`)),
        desc: sec.querySelector(`.${styles.chapter__desc}`) as HTMLElement | null,
        symbol: sec.querySelector(`.${styles.chapter__symbol}`) as HTMLElement | null,
        meta: sec.querySelector(`.${styles.chapter__meta}`) as HTMLElement | null,
      };
    });

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    function update() {
      if (!outer || !sticky || !wrapper || !prog) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollDist = (TOTAL_PANELS - 1) * vh;
      const maxX = (TOTAL_PANELS - 1) * vw;

      const rect = outer.getBoundingClientRect();
      const outerTop = rect.top;
      const outerLeft = rect.left;
      const outerWidth = rect.width;

      // 1. Avant le début
      if (outerTop > 0) {
        if (sticky.style.position !== "relative") {
          Object.assign(sticky.style, {
            position: "relative",
            top: "0",
            left: "0",
            width: "100%",
          });
        }
        gsap.set(wrapper, { x: 0 });
        gsap.set(prog, { scaleX: 0 });
        return;
      }

      // 2. Après la fin
      const scrolled = -outerTop;
      if (scrolled >= scrollDist) {
        if (sticky.style.position !== "absolute") {
          Object.assign(sticky.style, {
            position: "absolute",
            top: `${scrollDist}px`,
            left: "0",
            width: "100%",
          });
        }
        gsap.set(wrapper, { x: -maxX });
        gsap.set(prog, { scaleX: 1 });
        return;
      }

      // 3. Zone Active (Fixed)
      // On met à jour left/width à chaque frame car rect.left peut changer on-the-fly (ex: scrollbar apparition)
      Object.assign(sticky.style, {
        position: "fixed",
        top: "0",
        left: `${outerLeft}px`,
        width: `${outerWidth}px`,
      });

      const progress = Math.max(0, Math.min(1, scrolled / scrollDist));

      // Translation horizontale
      gsap.set(wrapper, { x: -maxX * progress });

      // Barre de progression
      gsap.set(prog, { scaleX: progress });

      // Animations de contenu
      chapters.forEach((_, i) => {
        const el = chapterEls[i];
        if (!el) return;

        const center = (i + 1) / (TOTAL_PANELS - 1);
        const half = 0.5 / (TOTAL_PANELS - 1);
        const enterAt = center - half * 0.9;

        if (progress >= enterAt && !played[i]) {
          played[i] = true;
          reversed[i] = false;

          gsap.to(el.chars, {
            y: "0%", opacity: 1, rotate: 0,
            duration: 1.2, stagger: 0.02, ease: "power4.out",
            overwrite: true,
          });
          gsap.to([el.desc, el.meta], {
            y: 0, opacity: 1,
            duration: 0.9, delay: 0.2, stagger: 0.1, ease: "power3.out",
            overwrite: true,
          });
          if (el.symbol) {
            gsap.to(el.symbol, {
              scale: 1, opacity: 1, rotate: 0,
              duration: 1.4, ease: "elastic.out(1, 0.6)",
              overwrite: true,
            });
          }
        }

        if (progress < enterAt && played[i] && !reversed[i]) {
          reversed[i] = true;
          played[i] = false;

          gsap.to(el.chars, {
            y: "110%", opacity: 0,
            duration: 0.4, stagger: 0.008, ease: "power2.in",
            overwrite: true,
          });
          gsap.to([el.desc, el.meta], {
            y: 20, opacity: 0,
            duration: 0.3, ease: "power2.in",
            overwrite: true,
          });
          if (el.symbol) {
            gsap.to(el.symbol, {
              scale: 0.5, opacity: 0,
              duration: 0.3, ease: "power2.in",
              overwrite: true,
            });
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className={styles.char}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      className={styles.blue_outer}
      ref={outerRef}
      style={{ height: `${TOTAL_PANELS * 100}vh` }}
    >
      <div className={styles.blue_sticky} ref={stickyRef}>

        {/* Frise */}
        <div className={styles.timeline_track}>
          <div className={styles.timeline_progress} ref={progressRef} />
          <div className={styles.timeline_dots}>
            {chapters.map((c) => (
              <div key={c.id} className={styles.timeline_dot}>
                <span className={styles.dot_year}>{c.year}</span>
                <span className={styles.dot_pip} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.viewport}>
          <div className={styles.horizontal_wrapper} ref={wrapperRef}>

            {/* Intro */}
            <section className={`${styles.section} ${styles.intro}`}>
              <div className={styles.intro__noise} />
              <h2 className={styles.intro__title}>Bleu</h2>
              <div className={styles.scroll_hint}>
                <span>Défiler</span>
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                  <path
                    d="M0 6H38M33 1L38 6L33 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </section>

            {/* Chapitres */}
            {chapters.map((chapter) => (
              <section
                key={chapter.id}
                className={`${styles.section} ${chapter.theme}`}
              >
                <div className={styles.grid} />
                <div className={styles.chapter__symbol}>{chapter.symbol}</div>

                <div className={styles.chapter__content}>
                  <div className={styles.chapter__era}>{chapter.era}</div>
                  <h2 className={styles.chapter__title}>
                    {splitText(chapter.title)}
                  </h2>
                  <p className={styles.chapter__desc}>{chapter.desc}</p>
                </div>

                <div className={styles.chapter__meta}>
                  <span className={styles.year}>{chapter.year}</span>
                  <span className={styles.label}>HISTOIRE DU BLEU</span>
                </div>
              </section>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}