import React from "react";
import { DishItem } from "@/models/restaurant/dishItem.type";
import RestaurantDish from "@/screens/restaurant/restaurantDish/RestaurantDish";

type RestaurantDishesProps = {
  dishes: DishItem[];
};

const RestaurantDishes = ({ dishes }: RestaurantDishesProps) => {
  return (
    <ul>
      {dishes.map((dish) => {
        return (
          <RestaurantDish
            name={dish.name}
            price={dish.price}
            weight={dish.weight}
            compound={dish.compound}
            photo={dish.photo}
          />
        );
      })}
    </ul>
  );
};

export default RestaurantDishes;
