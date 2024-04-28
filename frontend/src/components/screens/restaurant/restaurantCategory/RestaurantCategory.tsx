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

type RestaurantCategoryProps = Omit<Category, "dish_item"> & {
  editable?: boolean;
};

const RestaurantCategory = ({
  name,
  photo,
  id,
  editable,
}: RestaurantCategoryProps) => {
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
      {editable && (
        <div className={styles.upperContainer}>
          <Button
            btnType={"link"}
            btnStyle={"flat"}
            href={`?state=categoryEdit&type=edit&id=${id}`}
            iconSrc={"/icons/AddImage.svg"}
            className={styles.edit}
          />
          <Button
            btnType={"link"}
            btnStyle={"flat"}
            iconSrc={"/icons/Exit.svg"}
            href={`?state=delete&type=category&deleteId=${id}`}
            className={styles.delete}
          />
        </div>
      )}
      <h5 className={styles.title} onClick={categoryClickHandler}>
        {name}
      </h5>
      {editable && (
        <Button
          btnType={"link"}
          btnStyle={"outlined"}
          color={"gray"}
          iconSrc={"/icons/Edit.svg"}
          fontSize={"small"}
          className={styles.btn}
          href={`?state=dishesEdit&id=${id}`}
        >
          Изменить категорию
        </Button>
      )}
    </li>
  );
};

export default RestaurantCategory;
