import React from "react";
import { Menu } from "@/models/restaurant/menu.type";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";
import styles from "./restaurantMenus.module.scss";

type RestaurantMenusProps = {
  menus: Menu[];
};

const RestaurantMenus = ({ menus }: RestaurantMenusProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Меню</h3>
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
