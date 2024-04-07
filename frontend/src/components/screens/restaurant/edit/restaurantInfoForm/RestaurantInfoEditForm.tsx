"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useTags from "@/hooks/restaurant/useTags";
import styles from "./restaurantInfoEditForm.module.scss";
import Input from "@/components/shared/controls/input/Input";
import InputError from "@/components/shared/inputError/InputError";
import Button from "@/components/shared/controls/button/Button";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { useRouter } from "next/navigation";
import {
  restaurantInfoEditSchema,
  RestaurantProfileInfoSchema,
} from "./restaurantInfoEditForm.schema";
import MultipleSelect from "@/components/shared/controls/multipleSelect/MultipleSelect";
import React, { useState } from "react";
import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";
import { Option } from "react-multi-select-component";

const makeOptionsFromTags = (tags?: RestaurantTag[]) => {
  return (
    tags?.map((tag) => ({
      label: tag.name,
      value: tag.id,
    })) || []
  );
};

const makeTagsFromOptions = (options?: Option[]) => {
  return (
    options?.map((option) => ({
      id: option.value,
      name: option.label,
    })) || []
  );
};

const RestaurantInfoEditForm = () => {
  const [cuisineTags, setCuisineTags] = useState<RestaurantTag[]>([]);
  const [mealTimeTags, setMealTimeTags] = useState<RestaurantTag[]>([]);
  const [parkingTags, setParkingTags] = useState<RestaurantTag[]>([]);
  const [restrictionTag, setRestrictionTags] = useState<RestaurantTag[]>([]);

  const { data: tags, isSuccess } = useTags();
  const router = useRouter();

  const {
    register,
    formState: { isValid, errors, isLoading },
    handleSubmit,
  } = useForm<RestaurantProfileInfoSchema>({
    resolver: zodResolver(restaurantInfoEditSchema),
    mode: "onTouched",
  });

  const handleSave = async (data: RestaurantProfileInfoSchema) => {
    await RestaurantService.patchProfile(1, {
      address: data.address,
      phone: data.phone,
      site: data.site,
    });
    router.push("restaurant", { scroll: false });
  };

  if (!isSuccess) return null;

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(handleSave)}>
      <MultipleSelect
        {...register("cuisine")}
        handleChange={(value) => {
          setCuisineTags(makeTagsFromOptions(value));
        }}
        label={"Тип кухни"}
        options={makeOptionsFromTags(tags?.["Тип кухни"])}
      />
      <MultipleSelect
        {...register("mealTime")}
        handleChange={(value) => {
          setMealTimeTags(makeTagsFromOptions(value));
        }}
        label={"Время приема пищи"}
        options={makeOptionsFromTags(tags?.["Время приема пищи"])}
      />
      <MultipleSelect
        {...register("parking")}
        handleChange={(value) => {
          setParkingTags(makeTagsFromOptions(value));
        }}
        label={"Парковка"}
        options={makeOptionsFromTags(tags?.["Парковка"])}
      />
      <MultipleSelect
        {...register("restrictions")}
        handleChange={(value) => {
          setRestrictionTags(makeTagsFromOptions(value));
        }}
        label={"Пищевые ограничения"}
        options={makeOptionsFromTags(tags?.["Пищевые ограничения"])}
      />
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Адрес"}
        {...register("address")}
        className={styles.input}
      />
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Телефон"}
        {...register("phone")}
        className={styles.input}
      />
      <InputError error={errors.phone?.message} />
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Сайт"}
        {...register("site")}
        className={styles.input}
      />

      <Button
        btnType={"button"}
        style={"filled"}
        font={"comfortaa"}
        fontSize={"small"}
        disabled={isLoading}
      >
        Сохранить
      </Button>
      <Button
        btnType={"link"}
        href={"restaurant"}
        style={"flat"}
        font={"comfortaa"}
        fontSize={"small"}
      >
        Отменить
      </Button>
    </form>
  );
};

export default RestaurantInfoEditForm;
