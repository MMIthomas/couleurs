import React from "react";
import { Link } from "react-router-dom";
import styles from "./Discover.module.scss";
import InfiniteColorRows from "../../components/infiniteColorRows/InfiniteColorRows.tsx";

const Discover: React.FC = () => {

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backBtn} aria-label="Retour à l'accueil">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Accueil
      </Link>
      <InfiniteColorRows />
    </div>
  );
};

export default Discover;
