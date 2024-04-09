import React from "react";
import styles from "./raiting.module.scss";
import { clsx } from "clsx";
import { types } from "sass";
import Number = types.Number;

type RatingProps = {
  className?: string;
  value: number;
  withText?: boolean;
  withNumber?: boolean;
};

const Rating = ({ withText, withNumber, value, className }: RatingProps) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {withText && <p>рейтинг</p>}
      <meter
        value={value}
        min={0}
        max={5}
        optimum={5}
        low={2}
        high={4}
        className={styles.fill}
      />
      {withNumber && <p>{Math.round(value * 100) / 100}</p>}
    </div>
  );
};

export default Rating;
