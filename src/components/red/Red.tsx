import "./red.scss";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Red() {
  useEffect(() => {
    const wrapper = document.querySelector(".Horizontal");
    const text = document.querySelector(".Horizontal__text");
    if (!wrapper || !text) return;


    const split = SplitText.create(text, { type: "chars,words" });

    const container = document.querySelector('.container');
    if (!container) return;
    const scrollTween = gsap.to(container, {
      xPercent: -80,
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
        yPercent: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-20, 20),
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 30%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (split && split.revert) split.revert();
    };
  }, []);

  return (
    <div>
      <section className="Horizontal">
        <div className="container">
          <h3 className="Horizontal__text heading-xl">
            Le rouge a toujours 
          </h3>
        </div>
      </section>
    </div>
  );
}
