import React, { forwardRef, useId } from "react";
import { clsx } from "clsx";
import styles from "./sliderCheckbox.module.scss";

type SliderCheckboxProps = React.ComponentProps<"input"> & { label: string };

const SliderCheckbox = forwardRef<HTMLInputElement, SliderCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          type={"checkbox"}
          id={`slider-checkbox-${id}`}
          className={clsx(styles.input, className)}
          {...props}
        />
        <label htmlFor={`slider-checkbox-${id}`} className={styles.label}>
          {label}
        </label>
      </div>
    );
  },
);

SliderCheckbox.displayName = "SliderCheckbox";

export default SliderCheckbox;
