import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import styles from "./loginForm.module.scss";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z
    .string()
    .email("Необходимо ввести почту")
    .min(1, "Необходимо ввести почту"),
  password: z.string().min(8, "Пароль должен быть больше 8 символов"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    }).then((res) => {
      console.log(res);
    });
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
      </div>

      <div className={styles.btns}>
        <Button
          btnType={"button"}
          fontSize={"small"}
          font="comfortaa"
          btnStyle="filled"
          disabled={!isValid || isSubmitting}
        >
          Войти
        </Button>
        <Button
          btnType={"link"}
          fontSize={"small"}
          href={"?state=register"}
          font="comfortaa"
          btnStyle="flat"
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
