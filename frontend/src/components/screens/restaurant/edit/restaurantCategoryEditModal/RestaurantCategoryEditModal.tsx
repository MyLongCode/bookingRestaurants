"use client";

import React, { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import styles from "./restaurantCategoryEditModal.module.scss";
import Image from "next/image";
import { fileType } from "@/lib/zod/fileType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import CategoryService from "@/services/restaurant/CategoryService";
import InputError from "@/components/shared/inputError/InputError";
import { revalidateMenus } from "@/lib/actions";
import ImageInput from "@/components/shared/controls/imageInput/ImageInput";

const categoryEditSchema = z.object({
  photo: fileType,
  name: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
});

const categoryCreateSchema = z.object({
  photo: fileType,
  name: z.string().min(1, "Введите название категории!"),
});

type CategoryEditSchema = z.infer<typeof categoryEditSchema>;

const RestaurantCategoryEditModal = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type");
  const id = params.get("id");
  const menuId = params.get("menuId");

  const {
    register,
    handleSubmit,
    formState: { isValid, isLoading, errors },
    reset,
  } = useForm<CategoryEditSchema>({
    resolver: zodResolver(
      type === "edit" ? categoryEditSchema : categoryCreateSchema,
    ),
    mode: "onTouched",
  });

  const handleImageChange = (event: InputEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  const handleSave = async (data: CategoryEditSchema) => {
    if (type === "edit" && id) {
      await CategoryService.patch(id, data);
    } else if (menuId) {
      await CategoryService.create(data, menuId);
    }
    reset();
    setSelectedImage("");
    router.push("restaurant", { scroll: false });
  };

  return (
    <Modal state={"categoryEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>
          {type === "edit" ? "Редактирование" : "Создание"} категории
        </Modal.Title>
        <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
          <div className={styles.selectedImage}>
            {selectedImage && <Image src={selectedImage} alt={""} fill />}
          </div>
          <ImageInput
            {...register("photo", {
              onChange: handleImageChange,
            })}
          />
          <InputError error={errors.photo?.message?.toString()} />

          <div className={styles.inputs}>
            <Input
              style={"alternative"}
              placeholder={"Название категории"}
              className={styles.input}
              {...register("name")}
            />
            <InputError error={errors.name?.message} />
          </div>
          <Button
            btnType={"button"}
            type={"submit"}
            style={"filled"}
            font={"comfortaa"}
            fontSize={"small"}
            className={styles.submitBtn}
            disabled={!isValid || isLoading}
          >
            Сохранить
          </Button>
          <Button
            btnType={"link"}
            style={"flat"}
            font={"comfortaa"}
            fontSize={"small"}
            className={styles.submitBtn}
            href={"restaurant"}
          >
            Отменить
          </Button>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantCategoryEditModal;
