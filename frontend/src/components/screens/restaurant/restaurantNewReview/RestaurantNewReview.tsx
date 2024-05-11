"use client";

import Input from "@/components/shared/controls/input/Input";
import styles from "./RestaurantNewReview.module.scss";
import Button from "@/components/shared/controls/button/Button";
import ImageInput from "@/components/shared/controls/imageInput/ImageInput";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { fileType } from "@/lib/zod/fileType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import RatingControl from "@/components/shared/controls/ratingControl/RatingControl";
import ReviewService from "@/services/restaurant/ReviewService";
import { useSession } from "next-auth/react";

type RestaurantNewReviewProps = { restaurantId: string };

const restaurantNewReviewSchema = z
  .object({
    text: z.string().optional(),
    image: fileType
      .or(z.string())
      .transform((v: File | string) => (typeof v === "string" ? null : v)),
    rating: z.string(),
  })
  .refine((value) => value.rating !== "0", "Необходимо поставить оценку");

type RestaurantNewReviewSchema = z.infer<typeof restaurantNewReviewSchema>;

const RestaurantNewReview = ({ restaurantId }: RestaurantNewReviewProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: session } = useSession();

  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm<RestaurantNewReviewSchema>({
    mode: "onTouched",
    resolver: zodResolver(restaurantNewReviewSchema),
    defaultValues: {
      rating: "0",
      image: null,
      text: "",
    },
  });

  const handleSave = async (data: RestaurantNewReviewSchema) => {
    if (!session?.user) return;

    await ReviewService.create(restaurantId, {
      user: session.user.id,
      rating: data.rating,
      text: data.text || "",
      uploaded_images: data.image,
    });

    setSelectedImage(null);

    reset();
  };

  const handleImageChange = (event: InputEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  const handleRatingChange = async (value: number) => {
    setValue("rating", value.toString());
    await trigger("rating");
  };

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Поделитесь мнением</h4>
      <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
        <div className={styles.rating}>
          <RatingControl
            maxValue={5}
            handleChange={handleRatingChange}
            {...register("rating")}
          />
        </div>
        <Input
          inputType={"textarea"}
          inputStyle={"alternative"}
          placeholder={
            "Расскажите о своих впечатлениях: кухня, уровень обслуживания, интерьер"
          }
          className={styles.input}
          {...register("text")}
        />
        <div className={styles.imgInpWrapper}>
          {selectedImage && <div className={styles.imgWrapper}><Image src={selectedImage} alt={""} fill /></div>}
          <ImageInput
            className={styles.imgInput}
            isSelected={!!selectedImage}
            {...register("image", {
              onChange: handleImageChange,
            })}
          />
        </div>
        <Button
          btnType={"button"}
          btnStyle={"filled"}
          fontSize={"small"}
          font={"comfortaa"}
          className={styles.sendBtn}
          disabled={!isValid || isSubmitting}
        >
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default RestaurantNewReview;
