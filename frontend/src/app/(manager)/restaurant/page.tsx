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
      <section className={styles.carousel}>
        <Button
          btnType={"button"}
          color={"gray"}
          fontSize={"small"}
          iconSrc={"/icons/AddImage.svg"}
          style={"flat"}
        >
          Добавить все фото сразу
        </Button>
        <InfiniteCarousel
          images={[
            "/carousel/1.png",
            "/carousel/2.png",
            "/carousel/3.png",
            "/carousel/4.png",
            "/carousel/5.png",
            "/carousel/6.png",
            "/carousel/7.png",
            "/carousel/8.png",
          ]}
        />
      </section>
      <section>
        <RestaurantInfo
          address={"г. Екатеринбург ул. Малышева д. 56А"}
          cuisine={["итальянская", "европейская"]}
          mealTime={["завтрак", "бранч", "обед", "ужин"]}
          phoneNumber={"+7(343)364-42-40"}
          website={"https://italians-ekb.ru/"}
          parking={["есть", "бесплатная"]}
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
      <section className={styles.carousel}>
        <Button
          btnType={"button"}
          color={"gray"}
          fontSize={"small"}
          iconSrc={"/icons/AddImage.svg"}
          style={"flat"}
        >
          Добавить все фото сразу
        </Button>
        <InfiniteCarousel
          images={[
            "/carousel/9.png",
            "/carousel/10.png",
            "/carousel/11.png",
            "/carousel/12.png",
            "/carousel/13.png",
            "/carousel/14.png",
          ]}
        />
      </section>
      <section></section>
      <section></section>
    </main>
  );
};

export default RestaurantPage;
