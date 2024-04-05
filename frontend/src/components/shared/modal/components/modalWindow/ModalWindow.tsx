import React, { ReactNode } from "react";
import styles from "./modalWindow.module.scss";
import { clsx } from "clsx";

type ModalWindowProps = {
  children?: ReactNode;
  opacityType?: "default" | "transparent";
};

const ModalWindow = ({ children, opacityType }: ModalWindowProps) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        opacityType === "transparent" && styles.transparent,
      )}
    >
      {children}
    </div>
  );
};

export default ModalWindow;
