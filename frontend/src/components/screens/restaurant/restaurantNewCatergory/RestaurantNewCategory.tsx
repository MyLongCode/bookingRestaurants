import React from "react";
import Button from "@/components/shared/controls/button/Button";
import styles from "./restaurantNewCategory.module.scss";

type RestaurantNewCategoryProps = {
  menuId: string | number;
};

const RestaurantNewCategory = ({ menuId }: RestaurantNewCategoryProps) => {
  return (
    <div className={styles.wrapper}>
      <Button
        btnType={"link"}
        style={"outlined"}
        color={"gray"}
        iconSrc={"/icons/Edit.svg"}
        fontSize={"small"}
        href={`?state=categoryEdit&type=create&menuId=${menuId}`}
        className={styles.btn}
      >
        Добавить категорию
      </Button>
    </div>
  );
};

export default RestaurantNewCategory;
