"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ModalTitle from "@/components/shared/modal/components/modalTitle/ModalTitle";
import styles from "./modal.module.scss";
import Portal from "@/hoc/Portal";
import ModalWindow from "@/components/shared/modal/components/modalWindow/ModalWindow";

type ModalProps = {
  children?: ReactNode;
  onDarkerClick?: () => void;
};

const Modal = ({ children, onDarkerClick }: ModalProps) => {
  return (
    <Portal>
      <div className={styles.wrapper} onClick={onDarkerClick}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.Title = ModalTitle;
Modal.Window = ModalWindow;

export default Modal;
