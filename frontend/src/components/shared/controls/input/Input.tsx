"use client";

import React, { forwardRef, useState } from "react";
import styles from "./input.module.scss";
import Image from "next/image";
import { clsx } from "clsx";

type InputProps = React.ComponentProps<"input"> &
  React.ComponentProps<"textarea"> & {
    inputStyle?: "default" | "alternative";
    inputType?: "default" | "textarea";
  };

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  (
    { children, type, className, inputStyle, inputType, ...props }: InputProps,
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <div
        className={clsx(
          styles.wrapper,
          {
            [styles.alternative]: inputStyle === "alternative",
          },
          className,
        )}
      >
        {inputType !== "textarea" ? (
          <input
            className={styles.input}
            maxLength={type === "password" ? 22 : 45}
            type={
              type === "password" && !passwordVisible
                ? "password"
                : type === "password"
                  ? "text"
                  : type
            }
            ref={ref}
            {...props}
          />
        ) : (
          <textarea
            className={styles.input}
            maxLength={135}
            inputMode={"text"}
            ref={ref}
            {...props}
          />
        )}
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
