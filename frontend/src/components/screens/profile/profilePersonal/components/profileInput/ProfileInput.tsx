"use client";

import React, { useState } from "react";
import styles from "./profileInput.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

type ProfileInputProps = {
  variant: "email" | "name" | "birthday";
};

enum InputLabel {
  "email" = "Почта",
  "name" = "ФИО",
  "birthday" = "День рождения",
}

enum InputPlaceholder {
  "email" = "Введите Ваш email...",
  "name" = "Введите Ваши ФИО",
  "birthday" = "Выберите ваш день рождения",
}

enum InputType {
  "email" = "email",
  "name" = "text",
  "birthday" = "date",
}

const inputSchema = z.object({
  field: z.string(),
});

type InputSchema = z.infer<typeof inputSchema>

const ProfileInput = ({ variant }: ProfileInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm<InputSchema>({
    mode: "onTouched",
    resolver: zodResolver(inputSchema),
  });

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleSave = (data: InputSchema) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={`profile-${variant}`}>
        {InputLabel[variant]}
      </label>
      <form onSubmit={handleSubmit(handleSave)}>
        <input
          type={InputType[variant]}
          id={`profile-${variant}`}
          placeholder={InputPlaceholder[variant]}
          className={styles.input}
          min={"1920-01-01"}
          max={"2024-12-31"}
          disabled={!isEditing}
          {...register("field")}
        />
        {!isEditing && (
          <Button
            btnType={"button"}
            btnStyle={"flat"}
            fontSize={"small"}
            type={"button"}
            onClick={() => setIsEditing(true)}
            className={styles.innerBtn}
          >
            Изменить
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              btnType={"button"}
              type={"submit"}
              btnStyle={"flat"}
              fontSize={"small"}
              disabled={isSubmitting || !isValid}
              className={styles.innerBtn}
            >
              Сохранить
            </Button>
            <Button
              btnType={"button"}
              type={"button"}
              btnStyle={"flat"}
              fontSize={"small"}
              onClick={handleCancel}
              className={styles.outerBtn}
            >
              Отменить
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileInput;
