import React from "react";
import Button from "@/components/shared/controls/button/Button";
import RestaurantDish from "@/screens/restaurant/restaurantDish/RestaurantDish";
import styles from "./restaurantNewCategory.module.scss";

const RestaurantNewCategory = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.upperContainer}>
        <Button
          btnType={"button"}
          style={"flat"}
          iconSrc={"/icons/AddImage.svg"}
        />
      </div>
      <h5 className={styles.title}>Добавить название</h5>
      <Button
        btnType={"button"}
        style={"outlined"}
        color={"gray"}
        iconSrc={"/icons/Edit.svg"}
        fontSize={"small"}
        className={styles.btn}
      >
        Добавить категорию
      </Button>
    </div>
  );
};

export default RestaurantNewCategory;
