"use client";

import React from "react";
import { Category } from "@/models/restaurant/category.type";
import RestaurantDish from "../restaurantDish/RestaurantDish";
import styles from "./restaurantCategory.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import RestaurantCategoryModal from "@/screens/restaurant/restaurantCategoryModal/RestaurantCategoryModal";
import CategoryService from "@/services/restaurant/CategoryService";

type RestaurantCategoryProps = Omit<Category, "dish_item"> & {};

const RestaurantCategory = ({ name, photo, id }: RestaurantCategoryProps) => {
  const router = useRouter();
  const categoryClickHandler = () => {
    router.push(`?state=category&categoryId=${id}`, {
      scroll: false,
    });
  };

  return (
    <li
      className={styles.wrapper}
      style={{ backgroundImage: `url("${photo}")` }}
    >
      <div className={styles.upperContainer}>
        <Button
          btnType={"button"}
          style={"flat"}
          iconSrc={"/icons/AddImage.svg"}
        />
        <Button
          btnType={"link"}
          style={"flat"}
          iconSrc={"/icons/Exit.svg"}
          href={`?state=delete&type=category&id=${id}`}
        />
      </div>
      <h5 className={styles.title} onClick={categoryClickHandler}>
        {name}
      </h5>
      <Button
        btnType={"link"}
        style={"outlined"}
        color={"gray"}
        iconSrc={"/icons/Edit.svg"}
        fontSize={"small"}
        className={styles.btn}
        href={`?state=categoryEdit&type=edit&id=${id}`}
      >
        Изменить категорию
      </Button>
    </li>
  );
};

export default RestaurantCategory;
