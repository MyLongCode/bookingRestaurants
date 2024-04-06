"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  restaurantInfoEditSchema,
  RestaurantProfileInfoSchema,
} from "@/restaurant/edit/restaurantInfoEditModal/restaurantInfoEditForm.schema";
import useTags from "@/hooks/restaurant/useTags";
import Select from "@/components/shared/controls/select/Select";
import styles from "./restaurantInfoEditForm.module.scss";
import Input from "@/components/shared/controls/input/Input";
import InputError from "@/components/shared/inputError/InputError";
import Button from "@/components/shared/controls/button/Button";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { useRouter } from "next/navigation";

const RestaurantInfoEditForm = () => {
  const { data: tags, isSuccess } = useTags();
  const router = useRouter();

  const {
    register,
    formState: { isValid, errors },
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
      <Select {...register("cuisine")}>
        <option value={undefined}>Тип кухни</option>
        {tags?.["Тип кухни"]?.map((tag) => {
          return <option key={tag.id}>{tag.name}</option>;
        })}
      </Select>
      <Select {...register("mealTime")}>
        <option value={undefined}>Время приема пищи</option>
        {tags?.["Время приема пищи"]?.map((tag) => {
          return <option key={tag.id}>{tag.name}</option>;
        })}
      </Select>
      <Select {...register("restrictions")}>
        <option value={undefined}>Пищевые ограничения</option>
        {tags?.["Пищевые ограничения"]?.map((tag) => {
          return <option key={tag.id}>{tag.name}</option>;
        })}
      </Select>
      <Select {...register("parking")}>
        <option value={undefined}>Парковка</option>
        {tags?.["Парковка"]?.map((tag) => {
          return <option key={tag.id}>{tag.name}</option>;
        })}
      </Select>
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Адрес"}
        {...register("address")}
      />
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Телефон"}
        {...register("phone")}
      />
      <InputError error={errors.phone?.message} />
      <Input
        type={"text"}
        style={"alternative"}
        placeholder={"Сайт"}
        {...register("site")}
      />

      <Button
        btnType={"button"}
        style={"filled"}
        font={"comfortaa"}
        fontSize={"small"}
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
