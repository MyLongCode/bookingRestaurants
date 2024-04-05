"use client";

import Modal from "@/components/shared/modal/Modal";
import Input from "@/components/shared/controls/input/Input";
import styles from "./restaurantProfileEditModal.module.scss";
import Button from "@/components/shared/controls/button/Button";

const RestaurantProfileEditModal = () => {
  return (
    <Modal state={"restaurantProfileEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Профиль заведения</Modal.Title>
        <form className={styles.form}>
          <Input
            type={"text"}
            style={"alternative"}
            placeholder={"Название заведения"}
            className={styles.title}
          />
          <Input
            type={"text"}
            style={"alternative"}
            inputType={"textarea"}
            placeholder={"Описание заведения"}
            className={styles.desc}
          />

          <div className={styles.imagesContainer}>
            <label htmlFor={"logo"} className={styles.label}>
              Выберите логотип
            </label>
            <input type={"file"} name={"logo"} id={"logo"} />
            <label htmlFor={"preview"} className={styles.label}>
              Выберите обложку
            </label>
            <input type={"file"} name={"preview"} id={"preview"} />
          </div>

          <div className={styles.activeContainer}>
            <Button
              btnType={"button"}
              fontSize={"small"}
              font={"comfortaa"}
              style={"filled"}
              type={"submit"}
            >
              Сохранить
            </Button>
            <Button
              btnType={"button"}
              fontSize={"small"}
              font={"comfortaa"}
              style={"flat"}
              type={"submit"}
            >
              Отменить
            </Button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantProfileEditModal;
