"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { fileType } from "@/lib/zod/fileType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import { DishItem } from "@/models/restaurant/dishItem.type";
import styles from "./restaurantDishEdit.module.scss";
import Button from "@/components/shared/controls/button/Button";
import ImageInput from "@/components/shared/controls/imageInput/ImageInput";
import DishesService from "@/services/restaurant/DishesService";
import InputError from "@/components/shared/inputError/InputError";

const restaurantDishEditSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  weight: z.string().optional(),
  photo: fileType.or(z.string()).transform((value) => {
    return typeof value === "string" ? undefined : value;
  }),
});

type RestaurantDishEditSchema = z.infer<typeof restaurantDishEditSchema>;

const RestaurantDishEdit = ({ name, weight, price, photo, id }: DishItem) => {
  const [selectedImage, setSelectedImage] = useState<string>(photo);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const handleImageChange = (event: InputEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  const handleSave = async (data: RestaurantDishEditSchema) => {
    await DishesService.patch(id, data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    console.log(errors);
    setSelectedImage(photo);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isLoading, isDirty },
    reset,
  } = useForm<RestaurantDishEditSchema>({
    resolver: zodResolver(restaurantDishEditSchema),
    mode: "onTouched",
    defaultValues: {
      name,
      weight: weight.toString(),
      price: price.toString(),
      photo,
    },
  });

  return (
    <li className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleSave)}
        onChange={() => setIsSubmitted(false)}
      >
        <div className={styles.imgContainer}>
          <Image src={selectedImage} alt={""} fill sizes={"1"} />
        </div>
        <ImageInput
          {...register("photo", {
            onChange: handleImageChange,
          })}
        />
        <InputError error={errors.photo?.message?.toString()} />
        <div className={styles.inputs}>
          <Input
            inputType={"textarea"}
            style={"alternative"}
            placeholder={"Название блюда"}
            className={styles.title}
            {...register("name")}
          />
          <InputError error={errors.name?.message} />
          <Input
            style={"alternative"}
            placeholder={"Вес, г"}
            {...register("weight")}
          />
          <InputError error={errors.weight?.message} />
          <Input
            style={"alternative"}
            placeholder={"Цена, ₽"}
            {...register("price")}
          />
          <InputError error={errors.price?.message} />
          <Button
            btnType={"button"}
            type={"submit"}
            style={"filled"}
            font={"comfortaa"}
            fontSize={"small"}
            className={styles.submit}
            disabled={!isDirty || !isValid || isLoading || isSubmitted}
          >
            Сохранить
          </Button>
          <Button
            btnType={"button"}
            type={"button"}
            style={"flat"}
            font={"comfortaa"}
            fontSize={"small"}
            onClick={handleReset}
            disabled={!isDirty}
          >
            Отменить
          </Button>
        </div>
      </form>
    </li>
  );
};

export default RestaurantDishEdit;
