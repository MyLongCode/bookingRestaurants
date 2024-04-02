import React from "react";
import type { DishItem } from "@/models/restaurant/dishItem.type";
import Image from "next/image";
import styles from "./restaurantDish.module.scss";

const RestaurantDish = ({
  name,
  weight,
  price,
  compound,
  photo,
}: Omit<DishItem, "id">) => {
  return (
    <li>
      <div className={styles.imgContainer}>
        <Image src={photo} alt={""} fill sizes={"1"} />
      </div>
      <h6>{name}</h6>
      <p>{weight} г</p>
      <p>{price} ₽</p>
    </li>
  );
};

export default RestaurantDish;
