import "./Red.scss";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

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
        yPercent: gsap.utils.random(-150, 150),
        rotation: gsap.utils.random(-15, 15),
        opacity: 0,
        scale: 0.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 40%",
          scrub: 1,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: spidermanRef.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 30%",
            scrub: 1.5,
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
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: dexter1Ref.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 35%",
            scrub: 1.5,
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
          y: -100,
          rotation: -40,
          scale: 1,
          autoAlpha: 1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: dexter2Ref.current,
            containerAnimation: scrollTween,
            start: "left 120%",
            end: "left 25%",
            scrub: 1.2,
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
          ease: "expo.out",
          scrollTrigger: {
            trigger: roseRef.current,
            containerAnimation: scrollTween,
            start: "left 110%",
            end: "left 30%",
            scrub: 1.5,
          },
        }
      );
    }

    // Stack 3D section
    const cards = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref].map(r => r.current).filter(Boolean);

    const finalPositions = [
      { x: -320, y: -80,  rotateZ: -18, rotateY: -25 },
      { x: -130, y:  90,  rotateZ:  -7, rotateY:  12 },
      { x:    0, y: -40,  rotateZ:   3, rotateY:   0 },
      { x:  150, y:  70,  rotateZ:  14, rotateY: -18 },
      { x:  310, y: -60,  rotateZ:  22, rotateY:  20 },
    ];

    gsap.set(cards, { x: 0, y: 0, rotateZ: 0, rotateY: 0, scale: 1, autoAlpha: 1 });

    cards.forEach((card, i) => {
      const pos = finalPositions[i];
      gsap.to(card, {
        ...pos,
        scale: 1,
        ease: "back.out(2)",
        duration: 0.8,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: stackStageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
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
