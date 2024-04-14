import React, { forwardRef, useId } from "react";
import styles from "./timeInput.module.scss";
import { clsx } from "clsx";

type TimeInputProps = React.ComponentProps<"input"> & { label?: string, containerClassName?: string };
const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, label, containerClassName, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx(styles.wrapper, containerClassName)}>
        <label
          htmlFor={`time-input-${id}`}
          className={clsx(styles.label, !label && styles.hidden)}
        >
          {label}
        </label>
        <input
          id={`time-input-${id}`}
          ref={ref}
          type={"time"}
          className={clsx(styles.input, className)}
          defaultValue={"00:00"}
          {...props}
        />
      </div>
    );
  },
);

TimeInput.displayName = "TimeInput";

export default TimeInput;
