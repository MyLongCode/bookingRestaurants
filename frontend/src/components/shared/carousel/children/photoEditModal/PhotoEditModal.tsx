"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import usePhoto from "@/hooks/shared/usePhoto";
import styles from "./photoEditModal.module.scss";
import ImageInput from "@/components/shared/controls/imageInput/ImageInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fileType } from "@/lib/zod/fileType";
import Input from "@/components/shared/controls/input/Input";
import Button from "@/components/shared/controls/button/Button";
import InputError from "@/components/shared/inputError/InputError";
import { zodResolver } from "@hookform/resolvers/zod";
import PhotoService from "@/services/restaurant/PhotoService";

const photoEditModalSchema = z.object({
  photo: fileType,
  title: z.string().min(1, "Введите название!"),
});

type PhotoEditModalSchema = z.infer<typeof photoEditModalSchema>;

const PhotoEditModal = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id")!;
  const { data: photo, isSuccess } = usePhoto(id);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (photo) {
      setSelectedImage(photo.image);
      setValue("title", photo.title);
    }
  }, [photo]);

  const handleImageChange = (event: InputEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  const handleSave = async (data: PhotoEditModalSchema) => {
    await PhotoService.patch(id, data);
    router.push("restaurant", { scroll: false });
  };

  const handleReset = () => {
    reset();
    setSelectedImage(photo?.image || "");
  };

  const {
    register,
    formState: { isValid, errors, isLoading, isDirty },
    handleSubmit,
    setValue,
    reset,
  } = useForm<PhotoEditModalSchema>({
    mode: "onTouched",
    resolver: zodResolver(photoEditModalSchema),
  });

  if (!isSuccess || !photo) return null;

  return (
    <Modal state={"photoEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Редактирование фото</Modal.Title>
        <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
          <div className={styles.imgContainer}>
            <Image src={selectedImage} alt={photo.title} fill />
          </div>
          <Input
            inputStyle={"alternative"}
            placeholder={"Название фото"}
            className={styles.title}
            {...register("title")}
          />
          <InputError error={errors.title?.message} />
          <ImageInput
            {...register("photo", {
              onChange: handleImageChange,
            })}
          />
          <div className={styles.btnsContainer}>
            <Button
              btnType={"button"}
              btnStyle={"filled"}
              type={"submit"}
              font={"comfortaa"}
              fontSize={"small"}
              disabled={!isValid || !isDirty || isLoading}
            >
              Сохранить
            </Button>
            <Button
              btnType={"link"}
              btnStyle={"flat"}
              href={"restaurant"}
              font={"comfortaa"}
              fontSize={"small"}
              onClick={handleReset}
            >
              Отменить
            </Button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default PhotoEditModal;
