import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/discover" className={styles.discoverBtn} aria-label="Voir les couleurs">
        Voir les couleurs
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
};

export default Home;
