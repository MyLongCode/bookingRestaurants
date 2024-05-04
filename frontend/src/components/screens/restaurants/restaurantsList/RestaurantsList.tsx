"use client";

import { Restaurant } from "@/models/restaurant/restaurant.type";
import RestaurantCard from "@/screens/restaurants/restaurantCard/RestaurantCard";
import styles from "./restaurantList.module.scss";
import FullRestaurantCard from "@/screens/restaurants/fullRestaurantCard/FullRestaurantCard";
import { clsx } from "clsx";

type RestaurantsListProps = {
  restaurants: Restaurant[];
  variant?: "default" | "full";
};

const RestaurantsList = ({ restaurants, variant }: RestaurantsListProps) => {
  return (
    <ul className={clsx(variant === "full" ? styles.fullList : styles.list)}>
      {restaurants.map((restaurant) => {
        return (
          <li key={restaurant.id}>
            {variant === "full" ? (
              <FullRestaurantCard
                id={restaurant.id}
                title={restaurant.name}
                logo={restaurant.logo}
                rating={restaurant.rating}
                address={restaurant.address}
              />
            ) : (
              <RestaurantCard
                id={restaurant.id}
                title={restaurant.name}
                logo={restaurant.logo}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RestaurantsList;
