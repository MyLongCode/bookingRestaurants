"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/input/Input";
import Button from "@/components/shared/button/Button";
import styles from "./loginModal.module.scss";

type LoginModalProps = { onClose: () => void };

const loginSchema = z.object({
  email: z.string().email().min(1, "Необходимо ввести почту"),
  password: z.string().min(8, "Пароль должен быть больше 8 символов"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginModal = ({ onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <Modal onDarkerClick={onClose}>
      <Modal.Window>
        <Modal.Title>Логин</Modal.Title>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <Input
              type={"email"}
              placeholder={"Введите email"}
              {...register("email")}
            />
            <Input
              type={"password"}
              placeholder={"Введите пароль"}
              {...register("password")}
            />
          </div>

          <Button
            font="comfortaa"
            style="outlined"
            disabled={!isValid || isSubmitting}
          >
            Войти
          </Button>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default LoginModal;
