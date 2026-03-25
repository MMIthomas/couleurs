import React from "react";
import styles from "./Discover.module.scss";
import ColorsList from "../../components/colorsList/ColorsList.tsx";
const Discover: React.FC = () => {
  return (
    <div className={styles.container}>
      <ColorsList />
    </div>
  );
};

export default Discover;
