"use client";

import React, { useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import Input from "@/components/shared/controls/input/Input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Button from "@/components/shared/controls/button/Button";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./restaurantMenuEditModal.module.scss";
import MenuService from "@/services/restaurant/MenuService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidateMenus } from "@/lib/actions";

const menuEditScheme = z.object({
  name: z.string().optional(),
});

const menuCreateScheme = z.object({
  name: z.string().min(1),
});

type MenuEditScheme = z.infer<typeof menuEditScheme>;

const RestaurantMenuEditModal = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const type = params.get("type");

  const {
    register,
    formState: { isValid, isLoading },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(type === "edit" ? menuEditScheme : menuCreateScheme),
  });

  useEffect(() => {
    revalidateMenus();
  }, []);

  const handleSave = async (data: MenuEditScheme) => {
    if (type === "create") {
      await MenuService.create(data.name!, 1);
    } else {
      await MenuService.patch(1, data.name);
    }
    await revalidateMenus();
    reset();
    router.push(pathname, { scroll: false });
  };

  return (
    <Modal state={"menuEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>
          {type === "edit" ? "Редактирование меню" : "Создание нового меню"}
        </Modal.Title>
        <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
          <Input
            inputStyle={"alternative"}
            type={"text"}
            placeholder={"Название"}
            {...register("name")}
          />
          <Button
            btnType={"button"}
            type={"submit"}
            btnStyle={"filled"}
            font={"comfortaa"}
            disabled={type === "create" && (!isValid || isLoading)}
          >
            Сохранить
          </Button>
          <Button
            btnType={"link"}
            btnStyle={"flat"}
            fontSize={"small"}
            font={"comfortaa"}
            href={pathname}
          >
            Отменить
          </Button>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantMenuEditModal;
