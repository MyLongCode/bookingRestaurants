"use client";

import React from "react";
import { Category } from "@/models/restaurant/category.type";
import RestaurantDish from "../restaurantDish/RestaurantDish";
import styles from "./restaurantCategory.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";

type RestaurantCategoryProps = Omit<Category, "id"> & {
  showDishes?: boolean;
  onArrowClick: (index: number) => void;
  index: number;
};

const RestaurantCategory = ({
  name,
  photo,
  showDishes,
  onArrowClick,
  index,
  dish_item: dishes,
}: RestaurantCategoryProps) => {
  return (
    <li className={styles.wrapper} style={{ backgroundImage: `url(${photo})` }}>
      <div className={styles.upperContainer}>
        <Button
          btnType={"button"}
          style={"flat"}
          iconSrc={"/icons/AddImage.svg"}
        />
        <Button btnType={"button"} style={"flat"} iconSrc={"/icons/Exit.svg"} />
      </div>
      <h5 className={styles.title}>{name}</h5>
      <Button
        className={clsx(styles.arrowBtn, showDishes && styles.arrowBtnActive)}
        btnType={"button"}
        style={"flat"}
        iconSrc={"/icons/Arrow.svg"}
        onClick={() => onArrowClick(index)}
      />
      <Button
        btnType={"button"}
        style={"outlined"}
        color={"gray"}
        iconSrc={"/icons/Edit.svg"}
        fontSize={"small"}
        className={styles.btn}
      >
        Изменить категорию
      </Button>
      <ul>
        {showDishes &&
          dishes.map((dish) => {
            return (
              <RestaurantDish
                key={dish.id}
                name={dish.name}
                price={dish.price}
                weight={dish.weight}
                compound={dish.compound}
                photo={dish.photo}
              />
            );
          })}
      </ul>
    </li>
  );
};

export default RestaurantCategory;
