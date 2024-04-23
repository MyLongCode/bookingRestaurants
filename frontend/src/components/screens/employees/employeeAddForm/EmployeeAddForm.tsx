"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import React from "react";
import styles from "./employeeAddForm.module.scss";
import Button from "@/components/shared/controls/button/Button";
import EmployeeService from "@/services/employees/EmployeeService";
import { useSession } from "next-auth/react";

const employeeAddFormSchema = z.object({
  name: z.string().min(1, "Необходимо ввести имя"),
  email: z.string().email("Не правильно введена почта (vasily@mail.ru)"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

type EmployeeAddFormSchema = z.infer<typeof employeeAddFormSchema>;

const EmployeeAddForm = () => {
  const { data: session } = useSession();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<EmployeeAddFormSchema>({
    mode: "onTouched",
    resolver: zodResolver(employeeAddFormSchema),
  });

  const handleCreate = async (data: EmployeeAddFormSchema) => {
    if (!session?.user?.currentRestaurant) return;

    await EmployeeService.create(session.user.currentRestaurant, {
      user: {
        ...data,
        isActive: true,
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
      <Input
        className={styles.name}
        inputStyle={"alternative"}
        type={"text"}
        placeholder={"Имя сотрудника"}
        {...register("name")}
      />
      <div className={styles.loginContainer}>
        <Input
          inputStyle={"alternative"}
          type={"text"}
          placeholder={"Почта"}
          {...register("email")}
        />
        <Input
          inputStyle={"alternative"}
          type={"password"}
          placeholder={"Пароль"}
          {...register("password")}
        />
      </div>
      <Button
        btnType={"button"}
        type={"submit"}
        btnStyle={"filled"}
        fontSize={"small"}
        font={"comfortaa"}
        className={styles.createBtn}
        disabled={!isValid || isSubmitting}
      >
        Добавить сотрудника
      </Button>
    </form>
  );
};

export default EmployeeAddForm;
