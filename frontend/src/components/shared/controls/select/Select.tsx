import React, { forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./select.module.scss";

type SelectProps = React.ComponentProps<"select"> & {
  children?: ReactNode[];
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }: SelectProps, ref) => {
    return (
      <select ref={ref} className={clsx(styles.wrapper, className)} {...props}>
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

export default Select;
