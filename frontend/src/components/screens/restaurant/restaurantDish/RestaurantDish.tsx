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
    <li className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <Image src={photo} alt={""} fill sizes={"1"} />
      </div>
      <h6 className={styles.title}>{name}</h6>
      <p className={styles.weight}>{weight} г</p>
      <p className={styles.price}>{price} ₽</p>
    </li>
  );
};

export default RestaurantDish;
