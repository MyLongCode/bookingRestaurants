"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/shared/controls/button/Button";
import CategoryService from "@/services/restaurant/CategoryService";
import styles from "./deleteModal.module.scss";

const DeleteModal = () => {
  const params = useSearchParams();
  const type = params.get("type");
  const id = params.get("id");
  const router = useRouter();

  const handleApprove = async () => {
    if (type === "category" && id) {
      await CategoryService.delete(id);
    }

    router.push("restaurant", { scroll: false });
  };

  return (
    <Modal state={"delete"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>
          Удалить {type === "category" ? "категорию" : ""}?
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
            btnType={"link"}
            style={"filled"}
            fontSize={"small"}
            font={"comfortaa"}
            href={"restaurant"}
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
