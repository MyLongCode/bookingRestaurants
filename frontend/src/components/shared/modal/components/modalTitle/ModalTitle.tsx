import React, { ReactNode } from "react";
import styles from "./modalTitle.module.scss";

type TitleProps = {
  children?: ReactNode;
};

const ModalTitle = ({ children }: TitleProps) => {
  return <h2 className={styles.text}>{children}</h2>;
};

export default ModalTitle;
