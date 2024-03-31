import React from "react";
import RestaurantHero from "@/components/screens/restaurant/restaurantHero/RestaurantHero";
import InfiniteCarousel from "@/components/shared/carousel/InfiniteCarousel";
import styles from "./restaurantPage.module.scss";
import Button from "@/components/shared/controls/button/Button";
import RestaurantInfo from "@/components/screens/restaurant/restaurantInfo/RestaurantInfo";

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
      <section className={styles.carousel1}>
        <Button
          btnType={"button"}
          color={"gray"}
          fontSize={"small"}
          iconSrc={"/icons/AddImage.svg"}
          style={"flat"}
        >
          Добавить все фото сразу
        </Button>
        <InfiniteCarousel />
      </section>
      <section>
        <RestaurantInfo
          workingHours={[
            "8:00-00:00",
            "8:00-00:00",
            "8:00-00:00",
            "8:00-00:00",
            "8:00-23:00",
            "10:00-23:00",
            "10:00-23:00",
          ]}
        />
      </section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
};

export default RestaurantPage;
