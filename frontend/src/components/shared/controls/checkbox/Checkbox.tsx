import React, { forwardRef } from "react";
import styles from "./checkbox.module.scss";
import { clsx } from "clsx";

type CheckboxProps = React.ComponentProps<"input"> & {
  children?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, ...props }: CheckboxProps, ref) => {
    return (
      <label className={clsx(styles.wrapper, className)}>
        <input
          className={styles.input}
          type={"checkbox"}
          ref={ref}
          {...props}
        />
        <span className={styles.text}>{children}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
