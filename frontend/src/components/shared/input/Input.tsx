import React, { forwardRef } from "react";
import styles from "./input.module.scss";

type InputProps = React.ComponentProps<"input"> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }: InputProps, ref) => {
    return (
      <input className={styles.wrapper} ref={ref} {...props}>
        {children}
      </input>
    );
  },
);

Input.displayName = "Input";

export default Input;
