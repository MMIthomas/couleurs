import styles from "./Red.module.scss";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, CustomEase);

export default function Red() {
  const mainRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const spidermanRef = useRef<HTMLImageElement>(null);
  const dexter1Ref = useRef<HTMLImageElement>(null);
  const dexter2Ref = useRef<HTMLImageElement>(null);
  const roseRef = useRef<HTMLVideoElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    const container = scrollContainerRef.current;

    if (!wrapper || !text || !container) return;

    CustomEase.create("reveal", "M0,0 C0.1,0 0.3,0.1 0.5,0.5 0.7,0.9 0.85,1 1,1");
    CustomEase.create("drift", "M0,0 C0.07,0.63 0.18,0.9 1,1");
    CustomEase.create("float", "M0,0 C0.25,0.1 0.3,1 1,1");

    const split = SplitText.create(text, { type: "chars,words" });
    const triggers: ScrollTrigger[] = [];

    gsap.set(container, { xPercent: 0 });

    gsap.set(container, { xPercent: 100 });

    const scrollTween = gsap.to(container, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: true,
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        onUpdate: (self) => { triggers[0] = self; },
      },
    });

    split.chars.forEach((char) => {
      gsap.from(char, {
        yPercent: gsap.utils.random(-80, 80),
        rotation: gsap.utils.random(-8, 8),
        opacity: 0,
        scale: 0.85,
        ease: "reveal",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 40%",
          scrub: 1.2,
        },
      });
    });

    if (spidermanRef.current) {
      gsap.fromTo(
        spidermanRef.current,
        { x: 400, y: 200, rotation: 25, scale: 0.6, autoAlpha: 0 },
        {
          x: 0, y: 0, rotation: -5, scale: 1, autoAlpha: 1, ease: "drift",
          scrollTrigger: {
            trigger: spidermanRef.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 30%",
            scrub: 1.2,
          },
        }
      );
    }

    if (dexter1Ref.current) {
      gsap.fromTo(
        dexter1Ref.current,
        { x: -300, y: 0, rotation: -20, skewX: 10, scale: 0.7, autoAlpha: 0 },
        {
          x: 0, y: 0, rotation: 3, skewX: 0, scale: 1, autoAlpha: 1, ease: "drift",
          scrollTrigger: {
            trigger: dexter1Ref.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 35%",
            scrub: 1.2,
          },
        }
      );
    }

    if (dexter2Ref.current) {
      gsap.fromTo(
        dexter2Ref.current,
        { x: 600, y: -30, rotation: 30, scale: 0.5, autoAlpha: 0 },
        {
          x: 0, y: -60, rotation: -40, scale: 1, autoAlpha: 1, ease: "drift",
          scrollTrigger: {
            trigger: dexter2Ref.current,
            containerAnimation: scrollTween,
            start: "left 120%",
            end: "left 25%",
            scrub: 1,
          },
        }
      );
    }

    if (roseRef.current) {
      gsap.fromTo(
        roseRef.current,
        { x: -400, y: 800, rotation: -25, scale: 0.4, autoAlpha: 0, filter: "blur(20px) brightness(0.5)" },
        {
          x: 0, y: 300, rotation: 25, scale: 1, autoAlpha: 1, filter: "blur(0px) brightness(1)", ease: "float",
          scrollTrigger: {
            trigger: roseRef.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 30%",
            scrub: 2,
          },
        }
      );
    }

    if (!manifestoRef.current) return;

    const rows      = gsap.utils.toArray<HTMLElement>(`.${styles["m-row"]}`, manifestoRef.current);
    const nums      = gsap.utils.toArray<HTMLElement>(`.${styles["m-num"]}`, manifestoRef.current);
    const rouge     = manifestoRef.current.querySelector<HTMLElement>(`.${styles["w-rouge"]}`);
    const bg        = manifestoRef.current.querySelector<HTMLElement>(`.${styles["manifesto-bg"]}`);
    const ticker    = manifestoRef.current.querySelector<HTMLElement>(`.${styles["manifesto-ticker"]}`);
    const lineAccent = manifestoRef.current.querySelector<HTMLElement>(`.${styles["manifesto-line-accent"]}`);

    const fromProps = [
      { x: -120, y: 40 },
      { x: 120,  y: 20 },
      { x: 0,    y: 60, scale: 0.8 },
      { x: -80,  y: 30 },
    ];

    gsap.set(rows, { autoAlpha: 0 });
    gsap.set(nums, { autoAlpha: 0 });
    rows.forEach((row, i) => gsap.set(row, fromProps[i] ?? { y: 40 }));
    if (rouge) gsap.set(rouge, { yPercent: 110 });
    if (lineAccent) gsap.set(lineAccent, { scaleX: 0 });
    if (ticker) gsap.set(ticker, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: "top top",
        end: "+=900%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(lineAccent, { scaleX: 1, ease: "none", duration: 0.4 });
    tl.to(ticker, { autoAlpha: 1, ease: "none", duration: 0.3 }, "<");

    rows.forEach((row, i) => {
      tl.to(row, { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: "drift", duration: 0.8 }, `>-0.1`);
      if (nums[i]) tl.to(nums[i], { autoAlpha: 0.4, ease: "none", duration: 0.3 }, "<");
    });

    tl.to(rouge, { yPercent: 0, ease: "drift", duration: 1 }, ">+0.2");

    if (bg) gsap.set(bg, { clipPath: "circle(0% at 50% 50%)" });
    tl.to(bg, { opacity: 1, clipPath: "circle(150% at 50% 50%)", ease: "power2.out", duration: 0.8 }, ">-0.3");

    tl.to(rows.slice(0, 4), { autoAlpha: 0, ease: "none", duration: 0.4 }, "<");
    tl.to(ticker, { autoAlpha: 0, ease: "none", duration: 0.3 }, "<");
    tl.to(lineAccent, { autoAlpha: 0, ease: "none", duration: 0.3 }, "<");

    if (rouge) {
      const rogueSplit = SplitText.create(rouge, { type: "chars" });
      const letterO = rogueSplit.chars[1];
      const otherChars = rogueSplit.chars.filter((_, i) => i !== 1);
      const tagline = manifestoRef.current.querySelector<HTMLElement>(`.${styles["manifesto-tagline"]}`);
      const taglineRouge = manifestoRef.current.querySelector<HTMLElement>(`.${styles["tagline-rouge"]}`);

      gsap.set(tagline, { autoAlpha: 0 });

      tl.to(otherChars, { autoAlpha: 0, ease: "none", duration: 0.3 }, ">+0.3");

      tl.to(letterO, {
        x: () => {
          const r = letterO.getBoundingClientRect();
          const vcx = document.documentElement.clientWidth / 2;
          return vcx - (r.left + r.width / 2);
        },
        y: () => {
          const r = letterO.getBoundingClientRect();
          const vcy = document.documentElement.clientHeight / 2;
          return vcy - (r.top + r.height / 2);
        },
        scale: 80,
        ease: "power2.in",
        duration: 1.8,
        transformOrigin: "center center",
      }, "<");

      tl.to(tagline, { autoAlpha: 1, ease: "none", duration: 0.8 }, ">-0.6");

      const getCenter = () => {
        if (!taglineRouge) return { cx: 50, cy: 88 };
        const r = taglineRouge.getBoundingClientRect();
        return {
          cx: ((r.left + r.width / 2) / window.innerWidth) * 100,
          cy: ((r.top + r.height / 2) / window.innerHeight) * 100,
        };
      };

      // Repositionne d'abord le centre sur "rouge" sans changer le rayon
      tl.to(bg, {
        clipPath: () => {
          const { cx, cy } = getCenter();
          return `circle(150% at ${cx.toFixed(1)}% ${cy.toFixed(1)}%)`;
        },
        ease: "none",
        duration: 0.01,
      }, "<");

      // Puis rétrécit depuis cette position
      tl.to(bg, {
        clipPath: () => {
          const { cx, cy } = getCenter();
          return `circle(5% at ${cx.toFixed(1)}% ${cy.toFixed(1)}%)`;
        },
        ease: "power2.in",
        duration: 1.0,
      });

      if (taglineRouge) tl.to(taglineRouge, { color: "#DB3B3B", ease: "none", duration: 0.1 }, ">-0.1");

      tl.to(bg, {
        clipPath: () => {
          const { cx, cy } = getCenter();
          return `circle(0% at ${cx.toFixed(1)}% ${cy.toFixed(1)}%)`;
        },
        ease: "power3.in",
        duration: 0.3,
      }, ">+0.1");
      tl.to(manifestoRef.current, { backgroundColor: "#ffffff", ease: "none", duration: 0.3 }, "<");
    }
  }, { scope: mainRef });

  return (
    <main className={styles.redContainer} ref={mainRef}>
      <section className={styles.horizontal} ref={wrapperRef}>
        <div className={styles.container} ref={scrollContainerRef}>

          <h3 className={`${styles.horizontalText} ${styles.headingXL}`} ref={textRef}>
            Le <span className={styles.highlight}>rouge</span> a toujours été{" "}
            <span className={styles.highlight}>important</span>
          </h3>

          <div className={styles["media-wrapper"]}>
            <img
              src="/src/assets/red/spiderman.png"
              alt="Spiderman"
              className={`${styles.scrollImg} ${styles["img-spiderman"]}`}
              ref={spidermanRef}
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className={`${styles.scrollImg} ${styles["img-dexter1"]}`}
              ref={dexter1Ref}
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className={`${styles.scrollImg} ${styles["img-dexter2"]}`}
              ref={dexter2Ref}
            />
            <video
              src="/src/assets/red/rose.mp4"
              className={`${styles.scrollVideo} ${styles["video-rose"]}`}
              autoPlay
              loop
              muted
              playsInline
              ref={roseRef}
            />
          </div>

        </div>
      </section>

      <section className={styles.manifesto} ref={manifestoRef}>
        <div className={styles["manifesto-bg"]} />

        <div className={styles["manifesto-ticker"]}>
          <span>Rouge — Rouge — Rouge — Rouge — Rouge — Rouge — Rouge — Rouge —&nbsp;</span>
        </div>

        <div className={styles["manifesto-content"]}>
          <div className={`${styles["m-row"]} ${styles["m-left"]}`}>
            <span className={styles["m-num"]}>01</span>
            <span className={`${styles["manifesto-word"]} ${styles["w-passion"]}`}>Passion</span>
          </div>
          <div className={`${styles["m-row"]} ${styles["m-right"]}`}>
            <span className={styles["m-num"]}>02</span>
            <span className={`${styles["manifesto-word"]} ${styles["w-danger"]} ${styles.outline}`}>Danger</span>
          </div>
          <div className={`${styles["m-row"]} ${styles["m-center"]}`}>
            <span className={styles["m-num"]}>03</span>
            <span className={`${styles["manifesto-word"]} ${styles["w-amour"]}`}>Amour</span>
          </div>
          <div className={`${styles["m-row"]} ${styles["m-left"]}`}>
            <span className={styles["m-num"]}>04</span>
            <span className={`${styles["manifesto-word"]} ${styles["w-colere"]} ${styles.outline}`}>Colère</span>
          </div>
          <div className={`${styles["m-row"]} ${styles["m-full"]}`}>
            <span className={`${styles["manifesto-word"]} ${styles["w-rouge"]}`}>Rouge</span>
          </div>
        </div>

        <div className={styles["manifesto-line-accent"]} />
        <p className={styles["manifesto-tagline"]}>
          Voilà, ce que c'est le <span className={styles["tagline-rouge"]}>rouge</span>.
        </p>
      </section>
    </main>
  );
}
