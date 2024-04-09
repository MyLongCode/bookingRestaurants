"use client";

import React, { useEffect } from "react";
import styles from "./restaurantProfileEditForm.module.scss";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "@/components/shared/inputError/InputError";
import { useRouter } from "next/navigation";
import {
  restaurantProfileEditSchema,
  RestaurantProfileEditSchema,
} from "./restaurantProfileEditForm.schema";
import RestaurantService from "@/services/restaurant/RestaurantService";
import useRestaurant from "@/hooks/restaurant/useRestaurant";

const RestaurantProfileEditForm = () => {
  const router = useRouter();
  const { data: restaurant } = useRestaurant(1);

  useEffect(() => {
    if (restaurant) {
      setValue("name", restaurant.name);
      setValue("description", restaurant.description);
    }
  }, [restaurant]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isLoading },
    setValue,
  } = useForm<RestaurantProfileEditSchema>({
    resolver: zodResolver(restaurantProfileEditSchema),
    mode: "onTouched",
  });

  const handleSave = async (data: RestaurantProfileEditSchema) => {
    await RestaurantService.patchProfile(1, data);
    router.push("restaurant", { scroll: false });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
      <Input
        type={"text"}
        inputStyle={"alternative"}
        placeholder={"Название заведения"}
        className={styles.title}
        {...register("name")}
      />
      <Input
        type={"text"}
        inputStyle={"alternative"}
        inputType={"textarea"}
        placeholder={"Описание заведения"}
        className={styles.desc}
        {...register("description")}
      />

      <div className={styles.imagesContainer}>
        <label htmlFor={"logo"} className={styles.label}>
          Выберите логотип
        </label>
        <input
          multiple
          type={"file"}
          id={"logo"}
          {...register("logo")}
          accept={"image/*"}
        />
        <InputError error={errors?.logo?.message?.toString()} />
        <label htmlFor={"preview"} className={styles.label}>
          Выберите обложку
        </label>
        <input multiple type={"file"} id={"preview"} {...register("preview")} />
        <InputError error={errors?.preview?.message?.toString()} />
      </div>

      <div className={styles.activeContainer}>
        <Button
          btnType={"button"}
          fontSize={"small"}
          font={"comfortaa"}
          btnStyle={"filled"}
          type={"submit"}
          disabled={!isValid || isLoading || !isDirty}
        >
          Сохранить
        </Button>
        <Button
          btnType={"link"}
          fontSize={"small"}
          font={"comfortaa"}
          btnStyle={"flat"}
          type={"reset"}
          href={"restaurant"}
        >
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default RestaurantProfileEditForm;
