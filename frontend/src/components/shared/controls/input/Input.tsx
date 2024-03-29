"use client";

import React, { forwardRef, useState } from "react";
import styles from "./input.module.scss";
import Image from "next/image";

type InputProps = React.ComponentProps<"input"> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, type, ...props }: InputProps, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          maxLength={type === "password" ? 22 : 30}
          type={type === "password" && !passwordVisible ? "password" : "text"}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <Image
            className={styles.eye}
            src={"/PasswordEye.svg"}
            alt={"Показать/скрыть пароль"}
            width={24}
            height={24}
            onClick={() => setPasswordVisible((prev) => !prev)}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;