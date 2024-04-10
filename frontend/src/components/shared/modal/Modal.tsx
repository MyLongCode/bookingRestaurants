"use client";

import React, { CSSProperties, ReactNode, useEffect } from "react";
import ModalTitle from "@/components/shared/modal/components/modalTitle/ModalTitle";
import styles from "./modal.module.scss";
import Portal from "@/hoc/Portal";
import ModalWindow from "@/components/shared/modal/components/modalWindow/ModalWindow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ModalProps = {
  children?: ReactNode;
  state: string;
  style?: CSSProperties;
  onOuterClick?: () => void;
};

const Modal = ({ children, state, style, onOuterClick }: ModalProps) => {
  const paramsState = useSearchParams().getAll("state");
  const path = usePathname();
  const router = useRouter();

  const handleOuterClick = () => {
    if (onOuterClick) {
      onOuterClick();
    } else {
      router.push(path, { scroll: false });
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "auto";
        router.push(path, { scroll: false });
      }
    };

    if (paramsState.includes(state)) {
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
    paramsState.includes(state) && (
      <>
        <Portal>
          <div
            className={styles.wrapper}
            onClick={handleOuterClick}
            style={style}
          >
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
