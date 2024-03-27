import React, { ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./button.module.scss";

type ButtonStyle = "filled" | "outlined" | "flat";
type ButtonFont = "default" | "comfortaa";

type ButtonProps = React.ComponentProps<"button"> & {
  style: ButtonStyle;
  font: ButtonFont;
  children?: ReactNode;
};

const Button = ({ style, font, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.wrapper,
        font === "comfortaa" && styles.comfortaa,
        {
          [styles.filled]: style === "filled",
          [styles.outlined]: style === "outlined",
          [styles.flat]: style === "flat",
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
