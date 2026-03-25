import { useRef } from "react";
import styles from "./ColorsList.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ColorCard from "./colorCard/ColorCard";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function ColorsList() {
  const colors = [
    {
      color: "#FF0000",
      content: [
        "/src/assets/colors/color1.png",
        "/src/assets/colors/color2.png",
        "/src/assets/colors/color3.png",
      ],
    },
    {
      color: "#00FF00",
      content: [
        "/src/assets/colors/color4.png",
        "/src/assets/colors/color5.png",
        "/src/assets/colors/color6.png",
      ],
    },
  ];

  return (
    <div className={styles.colorsList}>
      {colors.map((color, index) => (
        <ColorCard key={index} color={color.color} content={color.content} />
      ))}
    </div>
  );
}
