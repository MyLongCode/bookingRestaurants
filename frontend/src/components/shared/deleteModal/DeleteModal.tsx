"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/shared/controls/button/Button";
import CategoryService from "@/services/restaurant/CategoryService";
import styles from "./deleteModal.module.scss";
import DishesService from "@/services/restaurant/DishesService";
import { queryClient } from "@/app/providers";
import MenuService from "@/services/restaurant/MenuService";
import {revalidateMenus, revalidatePhotos} from "@/lib/actions";
import PhotoService from "@/services/restaurant/PhotoService";

type ObjectType = "menu" | "dish" | "category" | "photo";

enum TypeTitle {
  "menu" = "меню",
  "dish" = "блюдо",
  "category" = "категорию",
  "photo" = "фото",
}

const DeleteModal = () => {
  const searchParams = useSearchParams();
  const type: ObjectType = searchParams.get("type") as ObjectType;
  const categoryId = searchParams.get("categoryId");
  const dishId = searchParams.get("dishId");
  const menuId = searchParams.get("menuId");
  const photoId = searchParams.get("photoId");
  const router = useRouter();
  const pathname = usePathname();

  const handleApprove = async () => {
    if (type === "category" && categoryId) {
      await CategoryService.delete(categoryId);
    }
    if (type === "dish" && dishId) {
      await DishesService.delete(dishId);
      await queryClient.invalidateQueries({
        queryKey: [`restaurant dishes ${searchParams.get("id")}`],
      });
    }
    if (type === "menu" && menuId) {
      await MenuService.delete(menuId);
      await revalidateMenus();
    }
    if (type === "photo" && photoId) {
      await PhotoService.delete(photoId);
    }
    close();
  };

  const close = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("state", "delete");
    params.delete("type");
    params.delete("dishId");
    params.delete("categoryId");
    params.delete("menuId");
    params.delete("photoId");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Modal state={"delete"} style={{ zIndex: 100 }} onOuterClick={close}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Удалить {TypeTitle[type]}</Modal.Title>
        <div className={styles.btns}>
          <Button
            btnType={"button"}
            btnStyle={"filled"}
            fontSize={"small"}
            font={"comfortaa"}
            onClick={handleApprove}
            className={styles.btn}
          >
            Да
          </Button>
          <Button
            btnType={"button"}
            btnStyle={"filled"}
            fontSize={"small"}
            font={"comfortaa"}
            onClick={close}
            className={styles.btn}
          >
            Нет
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default DeleteModal;
