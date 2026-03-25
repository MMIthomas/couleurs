import { useRef } from "react";
import styles from "./Blue.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import lapisImg from "../../assets/blue/lapis.png";
import woadImg from "../../assets/blue/woad.png";
import navyImg from "../../assets/blue/navy.png";
import denimImg from "../../assets/blue/denim.png";
import kleinImg from "../../assets/blue/klein.png";
import couronneImg from "../../assets/blue/sacre/couronne_or.png";
import royalImg from "../../assets/blue/sacre/royal.png";
import sceptreImg from "../../assets/blue/sacre/sceptre.png";
import vikingRobeImg from "../../assets/blue/viking/viking_robe.svg";
import gendarmerieImg from "../../assets/blue/force/gendarmerie-sport.png";
import securite2Img from "../../assets/blue/force/securite2.png";

gsap.registerPlugin(ScrollTrigger, SplitText);


const chapters = [
  {
    id: "lapis",
    title: "L'Origine",
    year: "-3000",
    era: "Antiquité",
    desc: "Longtemps ignoré des textes et des arts, le bleu naît de la rareté absolue du Lapis-lazuli. Une couleur de l'ombre, discrète et précieuse, extraite des montagnes d'Afghanistan.",
    symbol: "◈",
    theme: styles.theme_lapis,
    animType: "ancient",
    images: [
      { src: lapisImg, size: "300px", top: "12%", left: "62%", rotate: -4 },
      { src: lapisImg, size: "190px", top: "55%", left: "80%", rotate: 8 },
      { src: lapisImg, size: "130px", top: "20%", left: "85%", rotate: 2 },
    ],
  },
  {
    id: "woad",
    title: "Le Barbare",
    year: "-500",
    era: "Fer",
    desc: "Les Celtes et les Gaulois teintent leurs corps au pastel des champs. Le bleu woad, primitif et violent, effraye l'ennemi. C'est la couleur des marges, de ceux que Rome méprise.",
    symbol: "⟁",
    theme: styles.theme_woad,
    animType: "barbarian",
    images: [
      { src: woadImg, size: "320px", top: "8%", left: "58%", rotate: 12 },
      { src: vikingRobeImg, size: "950px", bgSize: "55%", top: "0%", left: "15%", rotate: 0 }, // Encore plus à droite pour éviter la coupe à gauche
      { src: woadImg, size: "160px", top: "65%", left: "55%", rotate: 6 },
    ],
  },
  {
    id: "royal",
    title: "Le Sacré",
    year: "1200",
    era: "Médiéval",
    desc: "Au XIIe siècle, il se pare d'or pour devenir la couleur des rois. Le bleu s'installe enfin au sommet de la hiérarchie royale, avec le bleu en tant qu'emblème nationale avec la fleur de Lys.",
    symbol: "✦",
    theme: styles.theme_royal,
    animType: "sacred",
    images: [
      { src: royalImg, size: "750px", top: "5%", left: "30%", rotate: 0 },
      { src: sceptreImg, size: "550px", top: "15%", left: "50%", rotate: 0 },
      { src: couronneImg, size: "300px", top: "45%", left: "70%", rotate: -15 },
    ],
  },
  {
    id: "denim",
    title: "Le Peuple",
    year: "1873",
    era: "Industriel",
    desc: "Avec l'indigo et l'avènement du Denim, le bleu se démocratise. C'est désormais la couleur du travail, du repos et du rêve universel — porté par des millions de mains calleuses.",
    symbol: "▨",
    theme: styles.theme_denim,
    animType: "industrial",
    images: [
      { src: denimImg, size: "340px", top: "10%", left: "55%", rotate: -2 },
      { src: denimImg, size: "200px", top: "58%", left: "74%", rotate: 5 },
      { src: denimImg, size: "155px", top: "22%", left: "83%", rotate: -8 },
    ],
  },
  {
    id: "klein",
    title: "L'Absolu",
    year: "1960",
    era: "Moderne",
    desc: "Yves Klein brevète l'International Klein Blue. Une couleur si pure qu'elle abolit la forme. Le bleu cesse d'être une teinte — il devient une expérience spirituelle, immatérielle.",
    symbol: "○",
    theme: styles.theme_klein,
    animType: "absolute",
    images: [
      { src: kleinImg, size: "360px", top: "50%", left: "60%", rotate: 0 },
      { src: kleinImg, size: "180px", top: "12%", left: "72%", rotate: 0 },
      { src: kleinImg, size: "110px", top: "68%", left: "82%", rotate: 0 },
    ],
  },
  {
    id: "navy",
    title: "L'Ordre",
    year: "2024",
    era: "Numérique",
    desc: "Aujourd'hui, le bleu incarne la sécurité, la stabilité et l'ordre. C'est la couleur des forces de protection, de la gendarmerie et de l'autorité collective - un bleu qui rassure.",
    symbol: "⬡",
    theme: styles.theme_navy,
    animType: "digital",
    images: [
      { src: navyImg, size: "380px", top: "15%", left: "55%", rotate: 0 },
      { src: gendarmerieImg, size: "600px", top: "55%", left: "10%", rotate: 0 }, // La voiture !
      { src: securite2Img, size: "220px", top: "10%", left: "15%", rotate: -10 },
    ],
  },
];

const TOTAL_PANELS = 1 + chapters.length; // 7

// ─── Helpers d'animation images ───────────────────────────────────────────────

/**
 * Reveal les images à l'entrée d'un panneau, avec une mise en scène propre à chaque thème.
 * Chaque animType a sa logique visuelle : masque, rotation, stagger, etc.
 */
function revealImages(floaters: HTMLElement[], animType: string, vh: number) {
  floaters.forEach((img, i) => {
    const delay = i * 0.12;
    gsap.set(img, { opacity: 1 }); // rendre visible avant d'animer

    switch (animType) {
      // Lapis : révélation par un masque qui monte (comme un voile qui se lève)
      case "ancient":
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)", y: 30, rotate: (i - 1) * 5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            rotate: 0,
            duration: 1.1 + i * 0.1,
            delay,
            ease: "power3.inOut",
            overwrite: true,
          }
        );
        break;

      // Woad : jet violent, pas d'élégance + balancement pour la robe
      case "barbarian":
        if (i === 1) {
          // La robe viking : balancement SACADÉ (visible tout le temps, derrière tout)
          gsap.set(img, { clipPath: "inset(0%)", opacity: 1 });
          gsap.fromTo(
            img,
            { rotate: 8, transformOrigin: "center center" },
            {
              rotate: -8,
              duration: 0.3,
              ease: "steps(3)",
              repeat: -1,
              yoyo: true,
              overwrite: true,
            }
          );
        } else {
          gsap.fromTo(
            img,
            {
              clipPath: "inset(0% 100% 0% 0%)",
              x: 80,
              skewX: 20,
              rotate: (i % 2 === 0 ? 1 : -1) * 15,
              opacity: 0,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              x: 0,
              skewX: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.7,
              delay: delay * 0.7,
              ease: "expo.out",
              overwrite: true,
            }
          );
        }
        break;

      // Royal : chute majestueuse depuis le ciel (sauf le premier qui sert de décor)
      case "sacred":
        if (i === 0) {
          // Le décor (tissu)
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.9, y: 30, filter: "brightness(2) blur(20px)", clipPath: "inset(0%)" },
            {
              opacity: 0.45, // Légèrement plus visible
              scale: 1,
              y: 0,
              clipPath: "inset(0%)",
              filter: "brightness(1) blur(0px)",
              duration: 3,
              delay: 0.2,
              ease: "power2.out",
              overwrite: true,
            }
          );
        } else {
          // Les couronnes qui tombent LENTEMENT
          gsap.fromTo(
            img,
            {
              y: -vh, // Tombe de tout en haut
              opacity: 0,
              rotate: (i - 1) * 20,
              filter: "brightness(1.5) blur(5px)",
              clipPath: "inset(0%)",
            },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0%)",
              rotate: 0,
              filter: "brightness(1) blur(0px)",
              duration: 4 + i * 1, // Très lent
              delay: i * 0.5,
              ease: "power1.out", // Plus fluide, moins de rebond brutal
              overwrite: true,
            }
          );
        }
        break;

      // Denim : chute directe, efficace, comme une pièce de tissu posée
      case "industrial":
        gsap.fromTo(
          img,
          { clipPath: "inset(0% 0% 100% 0%)", y: -50 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.9,
            delay,
            ease: "power4.out",
            overwrite: true,
          }
        );
        break;

      // Klein : apparition depuis rien, le vide qui se matérialise
      case "absolute":
        gsap.fromTo(
          img,
          { scale: 0, opacity: 0, filter: "blur(40px) brightness(3)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px) brightness(1)",
            duration: 2,
            delay: delay * 0.8,
            ease: "expo.out",
            overwrite: true,
          }
        );
        break;

      // Navy / Digital : slide depuis la droite, précis, mécanique
      case "digital":
        if (i === 1) {
          // La voiture de gendarmerie : elle roule de droite à gauche
          gsap.fromTo(
            img,
            { xPercent: 150, opacity: 1, clipPath: "inset(0%)" },
            {
              xPercent: -150,
              duration: 3.5,
              delay: 0.1, // Démarrage rapide
              ease: "none",
              overwrite: true,
            }
          );
        } else {
          gsap.fromTo(
            img,
            { clipPath: "inset(0% 0% 0% 100%)", x: 40 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              x: 0,
              duration: 0.6 + i * 0.05,
              delay,
              ease: "power3.out",
              overwrite: true,
            }
          );
        }
        break;

      default:
        gsap.fromTo(
          img,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay, ease: "power2.out", overwrite: true }
        );
    }
  });
}

/**
 * Cache les images à la sortie d'un panneau, vite et proprement.
 */
function hideImages(floaters: HTMLElement[], animType: string) {
  floaters.forEach((img, i) => {
    gsap.killTweensOf(img); // Arrête toute animation en cours (dont l'oscillation infinie)
    const delay = i * 0.04;

    if (animType === "barbarian") {
      // Woad : disparition brutale vers la gauche
      gsap.to(img, {
        clipPath: "inset(0% 0% 0% 100%)",
        x: -60,
        duration: 0.3,
        delay,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => { gsap.set(img, { opacity: 0 }); },
      });
    } else if (animType === "absolute") {
      // Klein : dissolution
      gsap.to(img, {
        scale: 0.8,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.6,
        delay,
        ease: "power2.in",
        overwrite: true,
      });
    } else {
      // Par défaut : fondu rapide
      gsap.to(img, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        delay,
        ease: "power2.in",
        overwrite: true,
      });
    }
  });
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function Blue() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    const prog = progressRef.current;
    if (!outer || !sticky || !wrapper || !prog) return;

    const q = gsap.utils.selector(outerRef);

    const introSplit = new SplitText(q(`.${styles.intro__title}`), {
      type: "words,chars",
      wordsClass: styles.word,
    });
    const chapterSplits = chapters.map((_, i) => {
      const title = q(`.${styles.chapter__title}`)[i];
      return title ? new SplitText(title, { type: "words,chars", wordsClass: styles.word }) : null;
    });

    // ── Refs éléments par panneau ──────────────────────────────────────────────
    const chapterEls = chapters.map((ch, i) => {
      const sec = q(`.${styles.section}`)[i + 1] as HTMLElement;
      if (!sec) return null;
      return {
        chars: chapterSplits[i]?.chars || [],
        desc: sec.querySelector(`.${styles.chapter__desc}`) as HTMLElement | null,
        symbol: sec.querySelector(`.${styles.chapter__symbol}`) as HTMLElement | null,
        meta: sec.querySelector(`.${styles.chapter__meta}`) as HTMLElement | null,
        floaters: Array.from(sec.querySelectorAll(`.${styles.floating_img}`)) as HTMLElement[],
        type: ch.animType,
      };
    });

    const animStates = new Array(chapters.length + 1).fill("none");

    // ── Hint scroll ────────────────────────────────────────────────────────────
    const hint = q(`.${styles.scroll_hint}`)[0];
    if (hint) {
      gsap.from(hint, { y: 20, opacity: 0, duration: 1, delay: 1, ease: "power3.out" });
      gsap.to(hint, { y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    // ── Wandering subtil : lent et organique ───────────────────────────────────
    chapterEls.forEach((el) => {
      if (!el) return;
      el.floaters.forEach((img, idx) => {
        // Dérive lente en fond, parallaxe passive
        gsap.to(img, {
          x: `random(-18, 18)`,
          y: `random(-22, 22)`,
          rotate: `random(-5, 5)`,
          duration: `random(6, 10)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.8,
        });
      });
    });

    function resetAnims() {
      animStates.fill("none");
      gsap.set(
        q(
          `.${styles.intro__title}, .${styles.chapter__title}, .${styles.chapter__desc}, .${styles.chapter__meta}, .${styles.chapter__symbol}`
        ),
        { opacity: 0 }
      );
      // Cacher aussi toutes les images
      chapterEls.forEach((el) => {
        if (!el) return;
        gsap.set(el.floaters, { opacity: 0 });
      });
    }

    // ── Boucle de mise à jour ─────────────────────────────────────────────────
    function update() {
      if (!outer || !sticky || !wrapper || !prog) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const rect = outer.getBoundingClientRect();
      const outerTop = rect.top;
      const scrollDist = (TOTAL_PANELS - 1) * vh;
      const maxX = (TOTAL_PANELS - 1) * vw;

      // Avant la section
      if (outerTop > 0) {
        if (sticky.style.position !== "relative")
          Object.assign(sticky.style, { position: "relative", top: "0", left: "0", width: "100%" });
        gsap.set(wrapper, { x: 0 });
        gsap.set(prog, { scaleX: 0 });
        if (animStates[0] !== "none") resetAnims();
        return;
      }

      // Après la section
      if (-outerTop >= scrollDist) {
        if (sticky.style.position !== "absolute")
          Object.assign(sticky.style, {
            position: "absolute",
            top: `${scrollDist}px`,
            left: "0",
            width: "100%",
          });
        gsap.set(wrapper, { x: -maxX });
        gsap.set(prog, { scaleX: 1 });
        return;
      }

      Object.assign(sticky.style, {
        position: "fixed",
        top: "0",
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });

      const scrolled = -outerTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollDist));
      gsap.set(wrapper, { x: -maxX * progress });
      gsap.set(prog, { scaleX: progress });

      // ── Storytelling par panneau ─────────────────────────────────────────────
      for (let i = -1; i < chapters.length; i++) {
        const center = (i + 1) / (TOTAL_PANELS - 1);
        const range = 0.45 / (TOTAL_PANELS - 1); // Slightly tighter range to avoid overlap issues
        const isActive = Math.abs(progress - center) < range;
        const stateIdx = i + 1;
        const el =
          i === -1
            ? { chars: introSplit.chars, desc: null, symbol: null, meta: null, floaters: [], type: "intro" }
            : chapterEls[i];
        if (!el) continue;

        // ── Entrée ──────────────────────────────────────────────────────────────
        if (isActive && animStates[stateIdx] !== "active") {
          animStates[stateIdx] = "active";

          const targets =
            el.chars.length > 0
              ? el.chars
              : i === -1
                ? q(`.${styles.intro__title}`)
                : q(`.${styles.chapter__title}`)[i];

          // Texte principal
          switch (el.type) {
            case "intro":
              gsap.fromTo(
                targets,
                { y: 150, opacity: 0, rotateX: -90 },
                { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2, ease: "power4.out", overwrite: true }
              );
              break;
            case "ancient":
              gsap.fromTo(
                targets,
                { opacity: 0, filter: "blur(15px)", y: 30 },
                { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.04, duration: 1.5, ease: "power2.out", overwrite: true }
              );
              break;
            case "barbarian":
              gsap.fromTo(
                targets,
                { opacity: 0, x: -100, skewX: 45 },
                { opacity: 1, x: 0, skewX: 0, stagger: 0.02, duration: 0.8, ease: "expo.out", overwrite: true }
              );
              break;
            case "sacred":
              gsap.fromTo(
                targets,
                { opacity: 0, scale: 0.5, rotateY: 180 },
                { opacity: 1, scale: 1, rotateY: 0, stagger: 0.05, duration: 1.2, ease: "back.out(1.7)", overwrite: true }
              );
              break;
            case "industrial":
              gsap.fromTo(
                targets,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, stagger: 0.03, duration: 1, ease: "power3.out", overwrite: true }
              );
              break;
            case "absolute":
              gsap.fromTo(
                targets,
                { opacity: 0, scale: 0, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", stagger: 0.08, duration: 1.5, ease: "elastic.out(1, 0.75)", overwrite: true }
              );
              break;
            case "digital":
              gsap.fromTo(
                targets,
                { opacity: 0, x: 150, rotate: 10 },
                { opacity: 1, x: 0, rotate: 0, stagger: 0.01, duration: 0.5, ease: "power4.out", overwrite: true }
              );
              break;
          }

          // Éléments UI communs
          if (el.desc)
            gsap.to(el.desc, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out", overwrite: true });
          if (el.meta)
            gsap.to(el.meta, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out", overwrite: true });
          if (el.symbol)
            gsap.to(el.symbol, {
              opacity: 1,
              scale: 1,
              rotate: -360,
              duration: 2,
              ease: "elastic.out(1, 0.5)",
              overwrite: true,
            });

          // Images — reveal thématique
          if (el.floaters.length > 0) {
            revealImages(el.floaters, el.type, vh);
          }
        }

        // ── Sortie ──────────────────────────────────────────────────────────────
        else if (!isActive && animStates[stateIdx] === "active") {
          animStates[stateIdx] = "none";

          const targets =
            el.chars.length > 0
              ? el.chars
              : i === -1
                ? q(`.${styles.intro__title}`)
                : q(`.${styles.chapter__title}`)[i];

          gsap.to(targets, {
            opacity: 0,
            y: -40,
            rotateX: 45,
            duration: 0.5,
            stagger: 0.01,
            ease: "power2.in",
            overwrite: true,
          });

          if (el.desc || el.meta)
            gsap.to([el.desc, el.meta].filter(Boolean), {
              opacity: 0,
              y: -20,
              duration: 0.3,
              overwrite: true,
            });

          if (el.symbol)
            gsap.to(el.symbol, { opacity: 0, scale: 0.5, duration: 0.4, overwrite: true });

          // Images — hide
          if (el.floaters.length > 0) {
            hideImages(el.floaters, el.type);
          }
        }
      }
    }

    // ── Scroll listener ────────────────────────────────────────────────────────
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      introSplit.revert();
      chapterSplits.forEach((s) => s?.revert());
    };
  }, { scope: outerRef });

  // ─── JSX ────────────────────────────────────────────────────────────────────

  return (
    <div
      className={styles.blue_outer}
      ref={outerRef}
      style={{ height: `${TOTAL_PANELS * 100}vh` }}
    >
      <div className={styles.blue_sticky} ref={stickyRef}>

        {/* Frise chronologique */}
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

                {/* Images flottantes — une par position, traitement CSS par thème */}
                <div className={styles.floating_images}>
                  {chapter.images.map((img: any, idx) => (
                    <div
                      key={idx}
                      className={styles.floating_img}
                      style={{
                        "--size": img.size,
                        "--bg-size": img.bgSize || "contain",
                        top: img.top,
                        left: img.left,
                        backgroundImage: `url(${img.src})`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>

                <div className={styles.chapter__symbol}>{chapter.symbol}</div>

                <div className={styles.chapter__content}>
                  <div className={styles.chapter__era}>{chapter.era}</div>
                  <h2 className={styles.chapter__title}>{chapter.title}</h2>
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
