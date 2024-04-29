import React from "react";
import Image from "next/image";
import styles from "./restaurants.module.scss";
import SearchField from "@/screens/restaurants/searchField/SearchField";
import Button from "@/components/shared/controls/button/Button";
import RestaurantService from "@/services/restaurant/RestaurantService";
import RestaurantsList from "@/screens/restaurants/restaurantsList/RestaurantsList";

const RestaurantsPage = async () => {
  const restaurants = await RestaurantService.getAll();

  return (
    <div>
      <section>
        <div className={styles.topContainer}>
          <h2 className={styles.title}>Рестораны</h2>
          <SearchField className={styles.search} />
          <Button
            btnType={"button"}
            btnStyle={"filled"}
            iconSrc={"/icons/Filter.svg"}
            fontSize={"small"}
            font={"comfortaa"}
            padding={"no"}
            className={styles.filtersBtn}
          >
            Фильтры
          </Button>
        </div>
      </section>
      <section className={styles.imgs}>
        <Image src={"/img/Burger.png"} alt={""} width={500} height={500} />
        <Image src={"/img/Cocktail.png"} alt={""} width={500} height={500} />
        <Image src={"/img/Cheesecake.png"} alt={""} width={500} height={500} />
      </section>
      <section className={styles.popular}>
        <h3>Популярные заведения</h3>
        <RestaurantsList restaurants={restaurants.results} />
      </section>
    </div>
  );
};

export default RestaurantsPage;
