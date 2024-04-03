import React from "react";
import RestaurantHero from "@/screens/restaurant/restaurantHero/RestaurantHero";
import InfiniteCarousel from "@/components/shared/carousel/InfiniteCarousel";
import styles from "./restaurantPage.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";
import RestaurantInfo from "@/screens/restaurant/restaurantInfo/RestaurantInfo";
import RestaurantMenus from "@/screens/restaurant/restaurantMenus/RestaurantMenus";
import RestaurantCategoryModal from "@/screens/restaurant/restaurantCategoryModal/RestaurantCategoryModal";
import RestaurantService from "@/services/restaurant/RestaurantService";

export type RestaurantPageSearchParams = {
  categoryId?: string;
};

type RestaurantPageProps = {
  searchParams: RestaurantPageSearchParams;
};

const RestaurantPage = async ({ searchParams }: RestaurantPageProps) => {
  const restaurant = await RestaurantService.getById(1);
  const photos = await RestaurantService.getPhotos(1).then((data) =>
    data.map((photo) => `${process.env.API_URL}${photo.image}`),
  );
  const menus = await RestaurantService.getMenus(1);

  return (
    <main className={clsx(styles.wrapper)}>
      <RestaurantHero
        imgSrc={"/italiansBG.jpg"}
        logoSrc={"/italiansLogo.png"}
        title={restaurant.name}
        description={restaurant.description}
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
        <InfiniteCarousel images={photos.slice(0, photos.length / 2)} />
      </section>
      <section>
        <RestaurantInfo
          address={restaurant.address}
          cuisine={["итальянская", "европейская"]}
          mealTime={["завтрак", "бранч", "обед", "ужин"]}
          phoneNumber={"+7(343)364-42-40"}
          website={"https://italians-ekb.ru/"}
          parking={["есть", "бесплатная"]}
          schedule={restaurant.schedule}
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
        <InfiniteCarousel images={photos.slice(photos.length / 2)} />
      </section>
      <section>
        <RestaurantMenus menus={menus} />
      </section>
      <section></section>
      <RestaurantCategoryModal searchParams={searchParams} />
    </main>
  );
};

export default RestaurantPage;
