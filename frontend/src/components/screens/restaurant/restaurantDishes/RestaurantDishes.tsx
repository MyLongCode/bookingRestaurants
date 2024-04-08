import React from "react";
import { DishItem } from "@/models/restaurant/dishItem.type";
import RestaurantDish from "@/screens/restaurant/restaurantDish/RestaurantDish";
import styles from "./restaurantDishes.module.scss";
import RestaurantDishEdit from "../edit/restaurantDishEdit/RestaurantDishEdit";

type RestaurantDishesProps = {
  dishes: DishItem[];
  editable?: boolean;
};

const RestaurantDishes = ({ dishes, editable }: RestaurantDishesProps) => {
  return (
    <ul className={styles.wrapper}>
      {dishes.map((dish) => {
        return editable ? (
          <RestaurantDishEdit
            key={dish.id}
            id={dish.id}
            name={dish.name}
            price={dish.price}
            weight={dish.weight}
            compound={dish.compound}
            photo={
              !!dish.photo ? `${process.env.API_URL}${dish.photo}` : undefined
            }
          />
        ) : (
          <RestaurantDish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            weight={dish.weight}
            compound={dish.compound}
            photo={
              !!dish.photo ? `${process.env.API_URL}${dish.photo}` : undefined
            }
          />
        );
      })}
      {editable && <RestaurantDishEdit asNew={true} />}
    </ul>
  );
};

export default RestaurantDishes;
