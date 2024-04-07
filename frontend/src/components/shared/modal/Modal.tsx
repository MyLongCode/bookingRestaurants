"use client";

import React, { ReactNode, useEffect } from "react";
import ModalTitle from "@/components/shared/modal/components/modalTitle/ModalTitle";
import styles from "./modal.module.scss";
import Portal from "@/hoc/Portal";
import ModalWindow from "@/components/shared/modal/components/modalWindow/ModalWindow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ModalProps = {
  children?: ReactNode;
  state: string;
};

const Modal = ({ children, state }: ModalProps) => {
  const paramsState = useSearchParams().get("state");
  const path = usePathname();
  const router = useRouter();

  const handleOuterClick = () => {
    document.body.style.overflow = "auto";
    router.push(path, { scroll: false });
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "auto";
        router.push(path, { scroll: false });
      }
    };

    if (paramsState === state) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [paramsState, path, state, router]);

  return (
    paramsState === state && (
      <>
        <Portal>
          <div className={styles.wrapper} onClick={handleOuterClick}>
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
