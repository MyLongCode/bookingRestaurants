import React, { forwardRef } from "react";
import styles from "./checkbox.module.scss";
import {clsx} from "clsx";

type CheckboxProps = React.ComponentProps<"input"> & {
  children?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, ...props }: CheckboxProps, ref) => {
    return (
      <label className={styles.wrapper}>
        <input
          className={clsx(styles.input, className)}
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
