import React, { ReactNode } from "react";
import styles from "./modalWindow.module.scss"

type ModalWindowProps = {
  children?: ReactNode;
};

const ModalWindow = ({ children }: ModalWindowProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ModalWindow;
