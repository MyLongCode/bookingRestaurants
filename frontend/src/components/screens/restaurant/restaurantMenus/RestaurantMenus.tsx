import React from "react";
import { Menu } from "@/models/restaurant/menu.type";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";
import styles from "./restaurantMenus.module.scss";
import Button from "@/components/shared/controls/button/Button";

type RestaurantMenusProps = {
  menus: Menu[];
  editable?: boolean;
};

const RestaurantMenus = ({ menus, editable }: RestaurantMenusProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Меню</h3>
        {editable && (
          <Button
            btnType={"link"}
            btnStyle={"filled"}
            fontSize={"small"}
            font={"comfortaa"}
            color={"gray"}
            iconSrc={"/icons/Edit.svg"}
            href={"?state=menuEdit&type=create"}
            className={styles.newMenuBtn}
          >
            Добавить меню
          </Button>
        )}
      </div>
      {menus.length > 0 ? (
        <div className={styles.menus}>
          {menus.map((menu) => {
            return (
              <RestaurantMenu
                key={menu.id}
                id={menu.id}
                name={menu.name}
                category={menu.category}
                editable={editable}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.empty}>Добавьте меню для редактирования</p>
      )}
    </div>
  );
};

export default RestaurantMenus;
