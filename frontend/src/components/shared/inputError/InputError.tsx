import React from "react";
import styles from "./inputError.module.scss";
import { clsx } from "clsx";

type InputErrorProps = {
  className?: string;
  error?: string;
};

const InputError = ({ className, error }: InputErrorProps) => {
  return (
    <>{!!error && <p className={clsx(styles.error, className)}>{error}</p>}</>
  );
};

export default InputError;
