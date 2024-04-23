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
import toast from "react-hot-toast";
import InputError from "@/components/shared/inputError/InputError";

const employeeAddFormSchema = z.object({
  full_name: z.string().min(1, "Необходимо ввести имя"),
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
    reset,
  } = useForm<EmployeeAddFormSchema>({
    mode: "onTouched",
    resolver: zodResolver(employeeAddFormSchema),
  });

  const handleCreate = async (data: EmployeeAddFormSchema) => {
    if (!session?.user?.currentRestaurant) return;

    await EmployeeService.create(session.user.currentRestaurant, {
      user: data,
    }).then(() => {
      toast.success("Сотрудник успешно добавлен");
    });

    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
      <Input
        className={styles.name}
        inputStyle={"alternative"}
        type={"text"}
        placeholder={"Имя сотрудника"}
        {...register("full_name")}
      />
      <InputError error={errors.full_name?.message} className={styles.error} />
      <div className={styles.loginContainer}>
        <div>
          <Input
            inputStyle={"alternative"}
            type={"text"}
            placeholder={"Почта"}
            {...register("email")}
          />
          <InputError error={errors.email?.message} className={styles.error} />
        </div>
        <div>
          <Input
            inputStyle={"alternative"}
            type={"password"}
            placeholder={"Пароль"}
            {...register("password")}
          />
          <InputError error={errors.password?.message} className={styles.error} />
        </div>
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
