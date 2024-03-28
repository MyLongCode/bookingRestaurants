import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/shared/modal/Modal";
import styles from "./registerModal.module.scss";
import Input from "@/components/shared/input/Input";
import Button from "@/components/shared/button/Button";

type RegisterModalProps = {};

const registerSchema = z
  .object({
    email: z
      .string()
      .email("Необходимо ввести почту (пример: yourmail@mail.ru)")
      .min(1, "Необходимо ввести почту"),
    password: z.string().min(8, "Пароль должен быть больше 8 символов"),
    confirmPassword: z.string().min(1, "Необходимо повторить пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterModal = (props: RegisterModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
  };

  return (
    <Modal state={"register"}>
      <Modal.Window>
        <Modal.Title>Регистрация</Modal.Title>
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
            <Input
              type={"password"}
              placeholder={"Повторите пароль"}
              {...register("confirmPassword")}
            />
            {!!errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
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
              Зарегистрироваться
            </Button>
            <Button
              btnType={"link"}
              fontSize={"small"}
              href={"?state=login"}
              font="comfortaa"
              style="flat"
            >
              Войти
            </Button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default RegisterModal;
