import React from "react";
import RestaurantHero from "@/components/screens/restaurant/restaurantHero/RestaurantHero";
import InfiniteCarousel from "@/components/shared/carousel/InfiniteCarousel";
import styles from "./restaurantPage.module.scss";

const RestaurantPage = () => {
  return (
    <main className={styles.wrapper}>
      <RestaurantHero
        imgSrc={"/italiansBG.jpg"}
        logoSrc={"/italiansLogo.png"}
        title={"Ресторан Итальянцы"}
        description={
          " — это дух Италии, эклектика и эстетика, как пицца и паста."
        }
      />
      <section>
        <InfiniteCarousel />
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
};

export default RestaurantPage;
