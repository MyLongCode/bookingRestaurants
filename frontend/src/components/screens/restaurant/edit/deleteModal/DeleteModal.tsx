"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/shared/controls/button/Button";
import CategoryService from "@/services/restaurant/CategoryService";
import styles from "./deleteModal.module.scss";
import DishesService from "@/services/restaurant/DishesService";
import { queryClient } from "@/app/providers";

const DeleteModal = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const categoryId = searchParams.get("categoryId");
  const dishId = searchParams.get("dishId");
  const router = useRouter();
  const pathname = usePathname();

  const handleApprove = async () => {
    if (type === "category" && categoryId) {
      await CategoryService.delete(categoryId);
    }
    if (type === "dish" && dishId) {
      await DishesService.delete(dishId);
      await queryClient.invalidateQueries({ queryKey: ["restaurant dishes"] });
    }
    close();
  };

  const close = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("state", "delete");
    params.delete("type");
    params.delete("dishId");
    params.delete("categoryId");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Modal state={"delete"} style={{ zIndex: 100 }} onOuterClick={close}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>
          Удалить{" "}
          {type === "category" ? "категорию" : type === "dish" ? "блюдо" : ""}?
        </Modal.Title>
        <div className={styles.btns}>
          <Button
            btnType={"button"}
            style={"filled"}
            fontSize={"small"}
            font={"comfortaa"}
            onClick={handleApprove}
            className={styles.btn}
          >
            Да
          </Button>
          <Button
            btnType={"button"}
            style={"filled"}
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
