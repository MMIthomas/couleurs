import React from "react";
import styles from "./Home.module.scss";
import Purple from "../../components/purple/Purple.tsx";
import Red from "../../components/red/Red.tsx";
import Blue from "../../components/blue/Blue.tsx";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Purple />
      <Red />
      <Blue />
    </div>
  );
};

export default Home;
