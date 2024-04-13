"use client";

import React, { useEffect, useState } from "react";
import styles from "./profileInput.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import UserService from "@/services/user/UserService";

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

const emailSchema = z.object({
  field: z.string().email(),
});

type InputSchema = z.infer<typeof inputSchema>;

const ProfileInput = ({ variant }: ProfileInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, update } = useSession();

  const refreshField = () => {
    if (session?.user.email) {
      setValue(
        "field",
        variant === "name"
          ? session.user.full_name
          : variant === "email"
            ? session.user.email
            : "",
      );
    }
  };

  useEffect(() => {
    refreshField();
  }, [session]);

  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<InputSchema>({
    mode: "onTouched",
    resolver: zodResolver(variant === "email" ? emailSchema : inputSchema),
  });

  const handleCancel = () => {
    setIsEditing(false);
    refreshField();
  };

  const handleSave = async (data: InputSchema) => {
    if (!session?.user) return;

    switch (variant) {
      case "name":
        break;
      case "email":
        await UserService.patch(session?.user.id, { email: data.field });
        await update({ user: { ...session.user, email: data.field } });
        break;
      case "birthday":
        break;
      default:
        break;
    }

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
