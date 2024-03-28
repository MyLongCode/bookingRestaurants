"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/input/Input";
import Button from "@/components/shared/button/Button";
import styles from "./loginModal.module.scss";

type LoginModalProps = {};

const loginSchema = z.object({
  email: z
    .string()
    .email("Необходимо ввести почту")
    .min(1, "Необходимо ввести почту"),
  password: z.string().min(8, "Пароль должен быть больше 8 символов"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginModal = (props: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <Modal state={"login"}>
      <Modal.Window>
        <Modal.Title>Вход в аккаунт</Modal.Title>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <Input
              type={"email"}
              placeholder={"Введите email"}
              {...register("email")}
            />
            {!!errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            <Input
              type={"password"}
              placeholder={"Введите пароль"}
              {...register("password")}
            />
            {!!errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.btns}>
            <Button
              btnType={"button"}
              fontSize={"small"}
              font="comfortaa"
              style="filled"
              disabled={!isValid || isSubmitting}
            >
              Войти
            </Button>
            <Button
              btnType={"link"}
              fontSize={"small"}
              href={"?state=register"}
              font="comfortaa"
              style="flat"
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default LoginModal;
