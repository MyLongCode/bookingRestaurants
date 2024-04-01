"use client";

import React, { useState } from "react";
import type { Menu } from "@/models/restaurant/menu.type";
import RestaurantCategory from "../restaurantCategory/RestaurantCategory";
import styles from "./restaurantMenu.module.scss";
import RestaurantNewCategory from "@/screens/restaurant/restaurantNewCatergory/RestaurantNewCategory";

type RestaurantMenuProps = Omit<Menu, "id"> & {};

const RestaurantMenu = ({
  category: categories,
  name,
}: RestaurantMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<number | undefined>();

  const categoryClickHandler = (index: number) => {
    setActiveCategory((prev) => (prev === index ? undefined : index));
  };

  return (
    <div>
      <h4 className={styles.title}>{name}</h4>
      <ul className={styles.categories}>
        {categories.map((category, index) => {
          return (
            <RestaurantCategory
              key={category.id}
              index={index}
              name={category.name}
              photo={category.photo}
              dish_item={category.dish_item}
              onArrowClick={categoryClickHandler}
              showDishes={activeCategory === index}
            />
          );
        })}
        <RestaurantNewCategory />
      </ul>
    </div>
  );
};

export default RestaurantMenu;
