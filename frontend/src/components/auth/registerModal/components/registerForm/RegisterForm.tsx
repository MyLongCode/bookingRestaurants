import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import styles from "./registerForm.module.scss";
import Checkbox from "@/components/shared/controls/checkbox/Checkbox";

const registerSchema = z
  .object({
    email: z
      .string()
      .email("Необходимо ввести почту (пример: yourmail@mail.ru)")
      .min(1, "Необходимо ввести почту"),
    password: z.string().min(8, "Пароль должен быть больше 8 символов"),
    confirmPassword: z.string().min(1, "Необходимо повторить пароль"),
    isManager: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <Input
          className={styles.input}
          type={"email"}
          placeholder={"Введите email"}
          {...register("email")}
        />
        {!!errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
        <Input
          className={styles.input}
          type={"password"}
          placeholder={"Введите пароль"}
          {...register("password")}
        />
        {!!errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        <Input
          className={styles.input}
          type={"password"}
          placeholder={"Повторите пароль"}
          {...register("confirmPassword")}
        />
        {!!errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
        <Checkbox className={styles.checkbox} {...register("isManager")}>
          Являюсь администратором
        </Checkbox>
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
  );
};

export default RegisterForm;
