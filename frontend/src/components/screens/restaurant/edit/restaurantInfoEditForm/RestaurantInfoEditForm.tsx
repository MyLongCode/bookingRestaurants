"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useTags from "@/hooks/restaurant/useTags";
import styles from "./restaurantInfoEditForm.module.scss";
import Input from "@/components/shared/controls/input/Input";
import InputError from "@/components/shared/inputError/InputError";
import Button from "@/components/shared/controls/button/Button";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  restaurantInfoEditSchema,
  RestaurantProfileInfoSchema,
} from "./restaurantInfoEditForm.schema";
import MultipleSelect from "@/components/shared/controls/multipleSelect/MultipleSelect";
import React, { useEffect, useState } from "react";
import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";
import { Option } from "react-multi-select-component";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRestaurantTags from "@/hooks/restaurant/useRestaurantTags";
import RestaurantTagsDto from "@/models/restaurant/restaurantTagsDto";
import WorkingHoursEdit from "@/restaurant/edit/workingHoursEdit/WorkingHoursEdit";
import {
  makeOptionsFromTags,
  makeTagsFromOptions,
} from "@/lib/helpers/tagsConverter";

const RestaurantInfoEditForm = () => {
  const [cuisineTags, setCuisineTags] = useState<RestaurantTag[]>([]);
  const [mealTimeTags, setMealTimeTags] = useState<RestaurantTag[]>([]);
  const [parkingTags, setParkingTags] = useState<RestaurantTag[]>([]);
  const [restrictionTags, setRestrictionTags] = useState<RestaurantTag[]>([]);
  const { id } = useParams<{ id: string }>();

  const pathname = usePathname();

  const { data: tags, isSuccess: isTagsSuccess } = useTags();
  const { data: restaurant, isSuccess: isRestaurantSuccess } =
    useRestaurant(id);
  const { data: restaurantTags, isSuccess: isRestaurantTagsSuccess } =
    useRestaurantTags(id);
  const router = useRouter();

  useEffect(() => {
    if (restaurant && restaurantTags) {
      setValue("site", restaurant.site);
      setValue("phone", restaurant.phone);
      setValue("address", restaurant.address);

      setCuisineTags(restaurantTags?.["Тип кухни"]);
      setMealTimeTags(restaurantTags?.["Время приема пищи"]);
      setParkingTags(restaurantTags?.["Парковка"]);
      setRestrictionTags(restaurantTags?.["Пищевые ограничения"]);
    }
  }, [restaurantTags, restaurant]);

  const {
    register,
    formState: { isValid, errors, isLoading },
    handleSubmit,
    setValue,
  } = useForm<RestaurantProfileInfoSchema>({
    resolver: zodResolver(restaurantInfoEditSchema),
    mode: "onTouched",
  });

  const handleSave = async (data: RestaurantProfileInfoSchema) => {
    const dto: RestaurantTagsDto = { tags: [] };

    if (cuisineTags)
      dto.tags = dto.tags.concat(cuisineTags.map((tag) => tag.id));
    if (mealTimeTags)
      dto.tags = dto.tags.concat(mealTimeTags.map((tag) => tag.id));
    if (restrictionTags)
      dto.tags = dto.tags.concat(restrictionTags.map((tag) => tag.id));
    if (parkingTags)
      dto.tags = dto.tags.concat(parkingTags.map((tag) => tag.id));

    await RestaurantService.patchProfile(1, {
      address: data.address,
      phone: data.phone,
      site: data.site,
    });

    await RestaurantService.patchTags(1, {
      tags: dto.tags,
    });
    router.push(pathname, { scroll: false });
  };

  if (!isRestaurantSuccess || !isTagsSuccess || !isRestaurantTagsSuccess)
    return null;

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(handleSave)}>
      <div className={styles.inputs}>
        <MultipleSelect
          {...register("cuisine")}
          handleChange={(value) => {
            setCuisineTags(makeTagsFromOptions(value));
          }}
          label={"Тип кухни"}
          options={makeOptionsFromTags(tags?.["Тип кухни"])}
          defaultValue={makeOptionsFromTags(cuisineTags)}
        />
        <MultipleSelect
          {...register("mealTime")}
          handleChange={(value) => {
            setMealTimeTags(makeTagsFromOptions(value));
          }}
          label={"Время приема пищи"}
          options={makeOptionsFromTags(tags?.["Время приема пищи"])}
          defaultValue={makeOptionsFromTags(mealTimeTags)}
        />
        <MultipleSelect
          {...register("parking")}
          handleChange={(value) => {
            setParkingTags(makeTagsFromOptions(value));
          }}
          label={"Парковка"}
          options={makeOptionsFromTags(tags?.["Парковка"])}
          defaultValue={makeOptionsFromTags(parkingTags)}
        />
        <MultipleSelect
          {...register("restrictions")}
          handleChange={(value) => {
            setRestrictionTags(makeTagsFromOptions(value));
          }}
          label={"Пищевые ограничения"}
          options={makeOptionsFromTags(tags?.["Пищевые ограничения"])}
          defaultValue={makeOptionsFromTags(restrictionTags)}
        />
        <Input
          type={"text"}
          inputStyle={"alternative"}
          placeholder={"Адрес"}
          {...register("address")}
          className={styles.input}
        />
        <Input
          type={"text"}
          inputStyle={"alternative"}
          placeholder={"Телефон"}
          {...register("phone")}
          className={styles.input}
        />
        <InputError error={errors.phone?.message} />
        <Input
          type={"text"}
          inputStyle={"alternative"}
          placeholder={"Сайт"}
          {...register("site")}
          className={styles.input}
        />
        <WorkingHoursEdit />
      </div>

      <div className={styles.btns}>
        <Button
          btnType={"button"}
          btnStyle={"filled"}
          font={"comfortaa"}
          fontSize={"small"}
          disabled={isLoading}
        >
          Сохранить
        </Button>
        <Button
          btnType={"link"}
          href={pathname}
          btnStyle={"flat"}
          font={"comfortaa"}
          fontSize={"small"}
        >
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default RestaurantInfoEditForm;
