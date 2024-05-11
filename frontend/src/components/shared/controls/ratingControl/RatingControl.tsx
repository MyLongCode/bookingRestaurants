"use client";

import React, { forwardRef, useEffect, useMemo, useState } from "react";
import Button from "@/components/shared/controls/button/Button";
import styles from "./ratingControl.module.scss";
import { clsx } from "clsx";

type RatingControlProps = React.ComponentProps<"input"> & {
  maxValue: number;
  handleChange: (value: number) => void;
};

const RatingControl = forwardRef<HTMLInputElement, RatingControlProps>(
  ({ maxValue, handleChange, ...props }, ref) => {
    const values = useMemo(() => {
      const result: number[] = [];
      for (let i = 1; i <= maxValue; i++) {
        result.push(i);
      }
      return result;
    }, [maxValue]);

    const [selectedValue, setSelectedValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    return (
      <div className={styles.wrapper}>
        {values.map((value) => {
          return (
            <Button
              key={value}
              btnType={"button"}
              btnStyle={"icon"}
              padding={"no"}
              type={"button"}
              iconSrc={"/StarUnfilled.svg"}
              className={clsx(
                styles.btn,
                hoverValue >= value ||
                  (hoverValue === 0 && selectedValue >= value)
                  ? styles.active
                  : null,
              )}
              onClick={() => {
                setSelectedValue(value);
                handleChange(value);
              }}
              onMouseOver={() => {
                setHoverValue(value);
              }}
              onMouseLeave={() => {
                setHoverValue(0);
              }}
            />
          );
        })}
        <input className={styles.input} ref={ref} {...props} />
      </div>
    );
  },
);

RatingControl.displayName = "RatingControl";

export default RatingControl;
