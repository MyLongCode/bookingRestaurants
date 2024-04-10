"use client";

import React, { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./button.module.scss";
import Link from "next/link";
import Image from "next/image";

type ButtonStyle = "filled" | "outlined" | "flat" | "icon";
type ButtonColor = "default" | "gray";
type ButtonFont = "default" | "comfortaa";
type ButtonFontSize = "default" | "small";

type ButtonProps = Partial<React.ComponentProps<"button">> &
  Partial<React.ComponentProps<typeof Link>> & {
    btnType: "link" | "button";
    color?: ButtonColor;
    btnStyle: ButtonStyle;
    iconSrc?: string;
    iconPosition?: "left" | "right";
    font?: ButtonFont;
    fontSize?: ButtonFontSize;
    children?: ReactNode;
  };

const Button = ({
  btnStyle,
  font,
  children,
  btnType,
  href,
  fontSize,
  iconSrc,
  iconPosition,
  color,
  className,
  ...props
}: ButtonProps) => {
  const cls = clsx(
    styles.wrapper,
    {
      [styles.comfortaa]: font === "comfortaa",
      [styles.filled]: btnStyle === "filled",
      [styles.outlined]: btnStyle === "outlined",
      [styles.flat]: btnStyle === "flat",
      [styles.iconStyle]: btnStyle === "icon",
      [styles.small]: fontSize === "small",
      [styles.gray]: color === "gray",
    },
    className,
  );

  return (
    <>
      {btnType === "button" || !href ? (
        <button className={cls} {...props}>
          {iconSrc && (
            <Image
              className={clsx(
                styles.icon,
                iconPosition === "right" && styles.icon_right,
              )}
              src={iconSrc}
              alt={"Иконка"}
              width={22}
              height={22}
            />
          )}
          {children}
        </button>
      ) : (
        <Link href={href} className={cls} scroll={false} {...props}>
          {iconSrc && (
            <Image
              className={clsx(
                styles.icon,
                iconPosition === "right" && styles.icon_right,
              )}
              src={iconSrc}
              alt={"Иконка"}
              width={22}
              height={22}
            />
          )}
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
