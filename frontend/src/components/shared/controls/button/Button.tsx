"use client";

import React, { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./button.module.scss";
import Link from "next/link";

type ButtonStyle = "filled" | "outlined" | "flat";
type ButtonFont = "default" | "comfortaa";
type ButtonFontSize = "default" | "small";

type ButtonProps = Partial<React.ComponentProps<"button">> &
  Partial<React.ComponentProps<typeof Link>> & {
    btnType: "link" | "button";
    style: ButtonStyle;
    font?: ButtonFont;
    fontSize?: ButtonFontSize;
    children?: ReactNode;
  };

const Button = ({
  style,
  font,
  children,
  btnType,
  href,
  fontSize,
  ...props
}: ButtonProps) => {
  const cls = clsx(styles.wrapper, {
    [styles.comfortaa]: font === "comfortaa",
    [styles.filled]: style === "filled",
    [styles.outlined]: style === "outlined",
    [styles.flat]: style === "flat",
    [styles.small]: fontSize === "small",
  });

  return (
    <>
      {btnType === "button" || !href ? (
        <button className={cls} {...props}>
          {children}
        </button>
      ) : (
        <Link href={href} className={cls} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
