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
import { useSearchParams } from "next/navigation";
import { queryClient } from "@/app/providers";

const restaurantDishEditSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  weight: z.string().optional(),
  photo: fileType.or(z.string()).transform((value) => {
    return typeof value === "string" ? undefined : value;
  }),
});

const restaurantDishCreateSchema = z.object({
  name: z.string().min(1, "Введите название!"),
  price: z.string().min(1, "Введите цену!"),
  weight: z.string().min(1, "Введите вес!"),
  photo: fileType.or(z.string()).transform((value) => {
    return typeof value === "string" ? undefined : value;
  }),
});

type RestaurantDishEditSchema = z.infer<typeof restaurantDishEditSchema>;

type RestaurantDishEditProps = Partial<DishItem> & { asNew?: boolean };

const RestaurantDishEdit = ({
  name,
  weight,
  price,
  photo,
  id,
  asNew,
}: RestaurantDishEditProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(photo || "");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const params = useSearchParams();

  const handleImageChange = (event: InputEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  const handleSave = async (data: RestaurantDishEditSchema) => {
    if (asNew) {
      const categoryId = params.get("id");
      if (!categoryId) return;

      await DishesService.create({
        ...data,
        category: categoryId,
        compound: "-",
      });
    } else {
      await DishesService.patch(id!, data);
    }
    setIsSubmitted(true);
    handleReset();
    await queryClient.invalidateQueries({
      queryKey: [`restaurant dishes ${params.get("id")}`],
    });
  };

  const handleReset = () => {
    setSelectedImage(photo || "");
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isLoading, isDirty },
    reset,
  } = useForm<RestaurantDishEditSchema>({
    resolver: asNew
      ? zodResolver(restaurantDishCreateSchema)
      : zodResolver(restaurantDishEditSchema),
    mode: "onTouched",
    defaultValues: {
      name,
      weight: weight?.toString(),
      price: price?.toString(),
      photo,
    },
  });

  return (
    <li className={styles.wrapper}>
      {!asNew && (
        <Button
          btnType={"link"}
          btnStyle={"flat"}
          type={"button"}
          iconSrc={"/icons/Exit.svg"}
          className={styles.delete}
          href={`?${params.toString()}&state=delete&type=dish&deleteId=${id}`}
        />
      )}
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleSave)}
        onChange={() => isSubmitted && setIsSubmitted(false)}
      >
        <div>
          <div className={styles.imgContainer}>
            {selectedImage && (
              <Image src={selectedImage} alt={""} fill sizes={"1"} />
            )}
          </div>
          <ImageInput
            {...register("photo", {
              onChange: handleImageChange,
            })}
          />
          <InputError error={errors.photo?.message?.toString()} />
        </div>
        <div className={styles.inputs}>
          <Input
            inputType={"textarea"}
            inputStyle={"alternative"}
            placeholder={"Название блюда"}
            className={styles.title}
            {...register("name")}
          />
          <InputError error={errors.name?.message} />
          <Input
            inputStyle={"alternative"}
            placeholder={"Вес, г"}
            {...register("weight")}
          />
          <InputError error={errors.weight?.message} />
          <Input
            inputStyle={"alternative"}
            placeholder={"Цена, ₽"}
            {...register("price")}
          />
          <InputError error={errors.price?.message} />
        </div>
        <div className={styles.btns}>
          <Button
            btnType={"button"}
            type={"submit"}
            btnStyle={"filled"}
            font={"comfortaa"}
            fontSize={"small"}
            className={styles.submit}
            disabled={!isDirty || !isValid || isLoading || isSubmitted}
          >
            {asNew ? "Создать" : "Сохранить"}
          </Button>
          <Button
            btnType={"button"}
            type={"button"}
            btnStyle={"flat"}
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
