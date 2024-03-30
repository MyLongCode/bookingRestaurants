"use client";

import React, { ReactNode, useEffect } from "react";
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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };

    if (params.get("state") === state) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [params, router, state]);

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
