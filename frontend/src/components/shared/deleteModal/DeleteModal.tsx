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
import { revalidateMenus, revalidatePhotos } from "@/lib/actions";
import PhotoService from "@/services/restaurant/PhotoService";
import deleteQuery from "@/lib/helpers/deleteQuery";
import EmployeeService from "@/services/employees/EmployeeService";
import { useSession } from "next-auth/react";
import BookingService from "@/services/booking/BookingService";

type ObjectType =
  | "menu"
  | "dish"
  | "category"
  | "photo"
  | "employee"
  | "booking";

enum TypeTitle {
  "menu" = "меню",
  "dish" = "блюдо",
  "category" = "категорию",
  "photo" = "фото",
  "employee" = "сотрудника",
  "booking" = "запись бронирования",
}

const DeleteModal = () => {
  const searchParams = useSearchParams();
  const type: ObjectType = searchParams.get("type") as ObjectType;
  const deleteId = searchParams.get("deleteId");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleApprove = async () => {
    if (!deleteId) return;

    if (type === "category") {
      await CategoryService.delete(deleteId);
    } else if (type === "dish") {
      await DishesService.delete(deleteId);
      await queryClient.invalidateQueries({
        queryKey: [`restaurant dishes ${searchParams.get("id")}`],
      });
    } else if (type === "menu") {
      await MenuService.delete(deleteId);
      await revalidateMenus();
    } else if (type === "photo") {
      await PhotoService.delete(deleteId);
    } else if (type === "employee" && session?.user?.currentRestaurant) {
      await EmployeeService.delete(session.user.currentRestaurant, deleteId);
    } else if (type === "booking") {
      await BookingService.delete(deleteId);
    }
    close();
  };

  const close = () => {
    const params = deleteQuery(searchParams, [
      {
        key: "state",
        value: "delete",
      },
      {
        key: "type",
      },
      {
        key: "deleteId",
      },
    ]);
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
