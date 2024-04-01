import React from "react";
import RestaurantHero from "@/screens/restaurant/restaurantHero/RestaurantHero";
import InfiniteCarousel from "@/components/shared/carousel/InfiniteCarousel";
import styles from "./restaurantPage.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";
import RestaurantInfo from "@/screens/restaurant/restaurantInfo/RestaurantInfo";
import RestaurantMenus from "@/screens/restaurant/restaurantMenus/RestaurantMenus";
import RestaurantCategoryModal from "@/screens/restaurant/restaurantCategoryModal/RestaurantCategoryModal";

type RestaurantPageSearchParaps = {
  categoryId?: string;
  menuId?: string;
};

type RestaurantPageProps = {
  searchParams: RestaurantPageSearchParaps;
};

const RestaurantPage = ({ searchParams }: RestaurantPageProps) => {
  return (
    <main className={clsx(styles.wrapper)}>
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
          address={"г. Екатеринбург ул. Малышева 56А"}
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
      <section>
        <RestaurantMenus
          menus={[
            {
              id: 1,
              name: "Основное меню",
              category: [
                {
                  id: 1,
                  name: "Горячие блюда",
                  photo: "/dishes/category-1.png",
                  dish_item: [
                    {
                      id: 1,
                      name: "Тальята из вырезки говядины с броколли и кремом тартуфа",
                      compound: "",
                      price: 100,
                      weight: 10,
                      photo: "/dishes/dish-1.png",
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              name: "Барное меню",
              category: [
                {
                  id: 2,
                  name: "Коктейли",
                  photo: "/dishes/category-2.png",
                  dish_item: [],
                },
              ],
            },
          ]}
        />
      </section>
      <section></section>
      <RestaurantCategoryModal searchParams={searchParams} />
    </main>
  );
};

export default RestaurantPage;
