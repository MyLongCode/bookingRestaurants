import { Restaurant } from "@/models/restaurant/restaurant.type";
import RestaurantCard from "@/screens/restaurants/restaurantCard/RestaurantCard";
import styles from "./restaurantList.module.scss";

type RestaurantsListProps = {
  restaurants: Restaurant[];
};

const RestaurantsList = ({ restaurants }: RestaurantsListProps) => {
  return (
    <ul className={styles.list}>
      {restaurants.map((restaurant) => {
        return (
          <li key={restaurant.id}>
            <RestaurantCard
              id={restaurant.id}
              title={restaurant.name}
              logo={restaurant.logo}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default RestaurantsList;
