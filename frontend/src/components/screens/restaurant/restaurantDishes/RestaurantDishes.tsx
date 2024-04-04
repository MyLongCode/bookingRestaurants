import React from "react";
import { DishItem } from "@/models/restaurant/dishItem.type";
import RestaurantDish from "@/screens/restaurant/restaurantDish/RestaurantDish";
import styles from "./restaurantDishes.module.scss";

type RestaurantDishesProps = {
  dishes: DishItem[];
};

const RestaurantDishes = ({ dishes }: RestaurantDishesProps) => {
  return (
    <ul className={styles.wrapper}>
      {dishes.map((dish) => {
        return (
          <RestaurantDish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            weight={dish.weight}
            compound={dish.compound}
            photo={`${process.env.API_URL}${dish.photo}`}
          />
        );
      })}
    </ul>
  );
};

export default RestaurantDishes;
