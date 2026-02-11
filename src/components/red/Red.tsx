import "./red.scss";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Red() {
  useEffect(() => {
    const wrapper = document.querySelector(".horizontal");
    const text = document.querySelector(".horizontalText");
    if (!wrapper || !text) return;

    const split = SplitText.create(text, { type: "chars,words" });

    const container = document.querySelector('.container');
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

    const images = document.querySelectorAll('.scrollImg');
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { y: gsap.utils.random(-200, 200) },
        {
          y: gsap.utils.random(200, 400),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'left 100%',
            end: 'left 30%',
            scrub: true,
            containerAnimation: scrollTween,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (split && split.revert) split.revert();
    };
  }, []);

  return (
    <main className="redContainer">
      <section className="horizontal">
        <div className="container">
          <h3 className="horizontalText headingXL">
            Le <span className="highlight">Rouge</span> a toujours été <span className="highlight">important</span>.
          </h3>
          <div className="imagesWrapper">
            <img src="/red/spiderman.jpg" alt="img1" className="scrollImg img1" />
            <img src="/red/img2.jpg" alt="img2" className="scrollImg img2" />
            <img src="/red/img3.jpg" alt="img3" className="scrollImg img3" />
            <img src="/red/img4.jpg" alt="img4" className="scrollImg img4" />
          </div>
        </div>
      </section>
    </main>
  );
}
