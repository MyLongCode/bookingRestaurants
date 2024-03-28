"use client";

import React, { ReactNode } from "react";
import ModalTitle from "@/components/shared/modal/components/modalTitle/ModalTitle";
import styles from "./modal.module.scss";
import Portal from "@/hoc/Portal";
import ModalWindow from "@/components/shared/modal/components/modalWindow/ModalWindow";
import { useRouter, useSearchParams } from "next/navigation";

type ModalProps = {
  children?: ReactNode;
  state: string;
};

const Modal = ({ children, state }: ModalProps) => {
  const params = useSearchParams();
  const router = useRouter();

  return (
    params.get("state") === state && (
      <>
        <Portal>
          <div className={styles.wrapper} onClick={() => router.push("/")}>
            <div
              className={styles.content}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </Portal>
      </>
    )
  );
};

Modal.Title = ModalTitle;
Modal.Window = ModalWindow;

export default Modal;
