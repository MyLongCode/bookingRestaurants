import React from "react";
import Loader from "@/components/shared/loader/Loader";
import styles from "./page.module.scss";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <Loader />
    </div>
  );
};

export default Loading;
