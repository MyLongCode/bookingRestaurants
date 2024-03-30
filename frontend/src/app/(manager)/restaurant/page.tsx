import React from "react";
import RestaurantHero from "@/components/screens/restaurant/restaurantHero/RestaurantHero";

const RestaurantPage = () => {
  return (
    <main>
      <RestaurantHero
        imgSrc={"/italiansBG.jpg"}
        logoSrc={"/italiansLogo.png"}
        title={"Ресторан Итальянцы"}
        description={
          " — это дух Италии, эклектика и эстетика, как пицца и паста."
        }
      />
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
};

export default RestaurantPage;
