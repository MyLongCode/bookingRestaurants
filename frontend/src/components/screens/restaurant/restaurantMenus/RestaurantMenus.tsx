import React from "react";
import { Menu } from "@/models/restaurant/menu.type";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";
import styles from "./restaurantMenus.module.scss";
import Button from "@/components/shared/controls/button/Button";

type RestaurantMenusProps = {
  menus: Menu[];
};

const RestaurantMenus = ({ menus }: RestaurantMenusProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Меню</h3>
        <Button
          btnType={"link"}
          style={"filled"}
          fontSize={"small"}
          font={"comfortaa"}
          color={"gray"}
          iconSrc={"/icons/Edit.svg"}
          href={"?state=menuEdit&type=create"}
          className={styles.newMenuBtn}
        >
          Добавить меню
        </Button>
      </div>
      {menus.map((menu) => {
        return (
          <RestaurantMenu
            key={menu.id}
            id={menu.id}
            name={menu.name}
            category={menu.category}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenus;
