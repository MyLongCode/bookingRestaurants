"use client";

import React from "react";
import { Category } from "@/models/restaurant/category.type";
import RestaurantDish from "../restaurantDish/RestaurantDish";
import styles from "./restaurantCategory.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import RestaurantCategoryModal from "@/screens/restaurant/restaurantCategoryModal/RestaurantCategoryModal";

type RestaurantCategoryProps = Category & {};

const RestaurantCategory = ({
  name,
  photo,
  id,
  dish_item: dishes,
}: RestaurantCategoryProps) => {
  const router = useRouter();
  const categoryClickHandler = () => {
    router.push(`?state=category&categoryId=${id}`, {
      scroll: false,
    });
  };

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
      <h5 className={styles.title} onClick={categoryClickHandler}>
        {name}
      </h5>
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
    </li>
  );
};

export default RestaurantCategory;
