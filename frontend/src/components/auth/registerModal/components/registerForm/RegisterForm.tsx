import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import styles from "./registerForm.module.scss";
import Checkbox from "@/components/shared/controls/checkbox/Checkbox";
import InputError from "@/components/shared/inputError/InputError";
import UserService from "@/services/user/UserService";
import { signIn } from "next-auth/react";

const registerSchema = z
  .object({
    full_name: z.string().min(1, "Необходимо ввести ФИО"),
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
    UserService.create({
      email: data.email,
      full_name: data.full_name,
      password: data.password,
      role: data.isManager ? "manager" : "user",
    }).then(async () => {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
      });
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={"text"}
            placeholder={"Введите Ваше ФИО"}
            {...register("full_name")}
          />
          {!!errors.full_name && (
            <InputError error={errors.full_name.message} />
          )}
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={"email"}
            placeholder={"Введите email"}
            {...register("email")}
          />
          {!!errors.email && <InputError error={errors.email.message} />}
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={"password"}
            placeholder={"Введите пароль"}
            {...register("password")}
          />
          {!!errors.password && <InputError error={errors.password.message} />}
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            type={"password"}
            placeholder={"Повторите пароль"}
            {...register("confirmPassword")}
          />
          {!!errors.confirmPassword && (
            <InputError error={errors.confirmPassword.message} />
          )}
        </div>

        <Checkbox className={styles.checkbox} {...register("isManager")}>
          Являюсь администратором
        </Checkbox>
      </div>

      <div className={styles.btns}>
        <Button
          btnType={"button"}
          fontSize={"small"}
          font="comfortaa"
          btnStyle="filled"
          disabled={!isValid || isSubmitting}
        >
          Зарегистрироваться
        </Button>
        <Button
          btnType={"link"}
          fontSize={"small"}
          href={"?state=login"}
          font="comfortaa"
          btnStyle="flat"
        >
          Войти
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
