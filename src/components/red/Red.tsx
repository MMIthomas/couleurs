import "./Red.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Red() {
  const containerRef = useRef(null);

  useEffect(() => {
    const wrapper = document.querySelector(".horizontal");
    const text = document.querySelector(".horizontalText");
    if (!wrapper || !text) return;

    const split = SplitText.create(text, { type: "chars,words" });

    const container = document.querySelector(".container");
    if (!container) return;
    
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

    const spiderman = document.querySelector('.img-spiderman');
    if (spiderman) {
      gsap.fromTo(
        spiderman,
        { 
          x: 400, 
          y: 200, 
          rotation: 25,
          scale: 0.6,
          autoAlpha: 0 
        },
        {
          x: 0,
          y: 0,
          rotation: -5,
          scale: 1,
          autoAlpha: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: spiderman,
            containerAnimation: scrollTween,
            start: 'left 110%',
            end: 'left 30%',
            scrub: 1.5,
          },
        }
      );
    }

    const dexter1 = document.querySelector('.img-dexter1');
    if (dexter1) {
      gsap.fromTo(
        dexter1,
        { 
          x: -300, 
          y: 0, 
          rotation: -20,
          skewX: 10,
          scale: 0.7,
          autoAlpha: 0 
        },
        {
          x: 0,
          y: 0,
          rotation: 3,
          skewX: 0,
          scale: 1,
          autoAlpha: 1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: dexter1,
            containerAnimation: scrollTween,
            start: 'left 110%',
            end: 'left 35%',
            scrub: 1.5,
          },
        }
      );

    }

    const dexter2 = document.querySelector('.img-dexter2');
    if (dexter2) {
      gsap.fromTo(
        dexter2,
        { 
          x: 600, 
          y: -30, 
          rotation: 30,
          scale: 0.5,
          autoAlpha: 0 
        },
        {
          x: 0,
          y: -100,
          rotation: -40,
          scale: 1,
          autoAlpha: 1,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: dexter2,
            containerAnimation: scrollTween,
            start: 'left 120%',
            end: 'left 25%',
            scrub: 1.2,
          },
        }
      );

    }

    const rose = document.querySelector('.video-rose');
    if (rose) {
      gsap.fromTo(
        rose,
        { 
          x: -400, 
          y: 800, 
          rotation: -25,
          scale: 0.4,
          autoAlpha: 0,
          filter: 'blur(20px) brightness(0.5)'
        },
        {
          x: 0,
          y: 300,
          rotation: 25,
          scale: 1,
          autoAlpha: 1,
          filter: 'blur(0px) brightness(1)',
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rose,
            containerAnimation: scrollTween,
            start: 'left 110%',
            end: 'left 30%',
            scrub: 1.5,
          },
        }
      );
    }



    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (split && split.revert) split.revert();
    };
  }, []);

  return (
    <main className="redContainer">
      <section className="horizontal">
        <div className="container" ref={containerRef}>


          <h3 className="horizontalText headingXL">
            Le <span className="highlight">rouge</span> a toujours été{" "}
            <span className="highlight">important</span>
          </h3>

          <div className="media-wrapper">
            <img
              src="/src/assets/red/spiderman.png"
              alt="Spiderman"
              className="scrollImg img-spiderman"
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className="scrollImg img-dexter1"
            />
            <img
              src="/src/assets/red/dexter.png"
              alt="Dexter"
              className="scrollImg img-dexter2"
            />
            <video
              src="/src/assets/red/rose.mp4"
              className="scrollVideo video-rose"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>
    </main>
  );
}