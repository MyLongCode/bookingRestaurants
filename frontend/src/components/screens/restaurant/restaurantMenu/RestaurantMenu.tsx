"use client";

import React, { useState } from "react";
import type { Menu } from "@/models/restaurant/menu.type";
import RestaurantCategory from "../restaurantCategory/RestaurantCategory";
import styles from "./restaurantMenu.module.scss";
import RestaurantNewCategory from "@/screens/restaurant/restaurantNewCatergory/RestaurantNewCategory";

type RestaurantMenuProps = Menu & {};

const RestaurantMenu = ({
  category: categories,
  name,
}: RestaurantMenuProps) => {
  return (
    <div>
      <h4 className={styles.title}>{name}</h4>
      <ul className={styles.categories}>
        {categories.map((category) => {
          return (
            <RestaurantCategory
              key={category.id}
              id={category.id}
              name={category.name}
              photo={`${process.env.API_URL}${category.photo}`}
              dish_item={category.dish_item}
            />
          );
        })}
        <RestaurantNewCategory />
      </ul>
    </div>
  );
};

export default RestaurantMenu;
