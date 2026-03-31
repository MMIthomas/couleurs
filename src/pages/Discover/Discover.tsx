import React from "react";
import styles from "./Discover.module.scss";
import InfiniteColorRows from "../../components/infiniteColorRows/InfiniteColorRows.tsx";

const Discover: React.FC = () => {
  return (
    <div className={styles.container}>
      <InfiniteColorRows />
    </div>
  );
};

export default Discover;
