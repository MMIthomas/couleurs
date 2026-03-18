import "./Red.scss";
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
  const stackSectionRef = useRef<HTMLElement>(null);
  const stackStageRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    const container = scrollContainerRef.current;

    if (!wrapper || !text || !container) return;

    CustomEase.create("reveal", "M0,0 C0.1,0 0.3,0.1 0.5,0.5 0.7,0.9 0.85,1 1,1");
    CustomEase.create("drift", "M0,0 C0.07,0.63 0.18,0.9 1,1");
    CustomEase.create("float", "M0,0 C0.25,0.1 0.3,1 1,1");

    const split = SplitText.create(text, { type: "chars,words" });

    gsap.set(container, { xPercent: 100 });

    const scrollTween = gsap.to(container, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: true,
        end: () => `+=${container.scrollWidth}`,
        anticipatePin: 1,
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
        {
          x: 400,
          y: 200,
          rotation: 25,
          scale: 0.6,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: -5,
          scale: 1,
          autoAlpha: 1,
          ease: "drift",
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
        {
          x: -300,
          y: 0,
          rotation: -20,
          skewX: 10,
          scale: 0.7,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 3,
          skewX: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "drift",
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
        {
          x: 600,
          y: -30,
          rotation: 30,
          scale: 0.5,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: -60,
          rotation: -40,
          scale: 1,
          autoAlpha: 1,
          ease: "drift",
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
        {
          x: -400,
          y: 800,
          rotation: -25,
          scale: 0.4,
          autoAlpha: 0,
          filter: "blur(20px) brightness(0.5)",
        },
        {
          x: 0,
          y: 300,
          rotation: 25,
          scale: 1,
          autoAlpha: 1,
          filter: "blur(0px) brightness(1)",
          ease: "float",
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

    // Stack 3D section
    const cards = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref].map(r => r.current).filter(Boolean);

    // Positions en cercle (rayon 300px, 5 cartes espacées de 72°, départ en haut)
    const circlePositions = [
      { x:    0, y: -300 },
      { x:  285, y:  -93 },
      { x:  176, y:  243 },
      { x: -176, y:  243 },
      { x: -285, y:  -93 },
    ];

    // État initial : petites, empilées au centre
    if (!stackSectionRef.current) return;

    gsap.set(cards, { x: 0, y: 0, scale: 0, autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackSectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Phase 1 : toutes les cards arrivent au centre, taille normale
    tl.to(cards, {
      scale: 1,
      autoAlpha: 1,
      ease: "none",
      duration: 1,
      stagger: 0.15,
    });

    // Pause entre les deux phases
    tl.to({}, { duration: 0.5 });

    // Phase 2 : formation en cercle (toutes simultanées)
    cards.forEach((card, i) => {
      tl.to(card, {
        x: circlePositions[i].x,
        y: circlePositions[i].y,
        ease: "none",
        duration: 1.5,
      }, "circle");
    });

    // Pause
    tl.to({}, { duration: 0.5 });

    // Phase 3 : alignement horizontal
    const lineSpacing = 220;
    const totalWidth = (cards.length - 1) * lineSpacing;
    cards.forEach((card, i) => {
      tl.to(card, {
        x: -totalWidth / 2 + i * lineSpacing,
        y: 0,
        ease: "none",
        duration: 1.5,
      }, "line");
    });
  }, { scope: mainRef });

  return (
    <main className="redContainer" ref={mainRef}>
      <section className="horizontal" ref={wrapperRef}>
        <div className="container" ref={scrollContainerRef}>

          <h3 className="horizontalText headingXL" ref={textRef}>
            Le <span className="highlight">rouge</span> a toujours été{" "}
            <span className="highlight">important</span>
          </h3>

          <div className="media-wrapper">
            <img
              src="/src/assets/red/spiderman.png"
              alt="Spiderman"
              className="scrollImg img-spiderman"
              ref={spidermanRef}
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className="scrollImg img-dexter1"
              ref={dexter1Ref}
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className="scrollImg img-dexter2"
              ref={dexter2Ref}
            />
            <video
              src="/src/assets/red/rose.mp4"
              className="scrollVideo video-rose"
              autoPlay
              loop
              muted
              playsInline
              ref={roseRef}
            />
          </div>

        </div>
      </section>

      <section className="stack-section" ref={stackSectionRef}>
        <div className="stack-stage" ref={stackStageRef}>
          <div className="stack-card card-1" ref={card1Ref}>
            <img src="/src/assets/red/spiderman.png" alt="Spiderman" />
          </div>
          <div className="stack-card card-2" ref={card2Ref}>
            <img src="/src/assets/red/dexter.png" alt="Dexter" />
          </div>
          <div className="stack-card card-3" ref={card3Ref}>
            <video src="/src/assets/red/rose.mp4" autoPlay loop muted playsInline />
          </div>
          <div className="stack-card card-4" ref={card4Ref}>
            <img src="/src/assets/red/dexter.png" alt="Dexter" />
          </div>
          <div className="stack-card card-5" ref={card5Ref}>
            <img src="/src/assets/red/spiderman.png" alt="Spiderman" />
          </div>
        </div>
      </section>
    </main>
  );
}
