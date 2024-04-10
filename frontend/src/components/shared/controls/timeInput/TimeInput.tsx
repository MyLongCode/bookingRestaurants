import React, { forwardRef, useId } from "react";
import styles from "./timeInput.module.scss";
import { clsx } from "clsx";

type TimeInputProps = React.ComponentProps<"input"> & {};
const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <>
        <label htmlFor={`time-input-${id}`} className={styles.label}></label>
        <input
          id={`time-input-${id}`}
          ref={ref}
          type={"time"}
          className={clsx(styles.input, className)}
          defaultValue={"00:00"}
          {...props}
        />
      </>
    );
  },
);

TimeInput.displayName = "TimeInput";

export default TimeInput;
