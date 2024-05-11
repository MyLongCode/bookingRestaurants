import React from "react";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clsx } from "clsx";
import RestaurantHero from "@/restaurant/restaurantHero/RestaurantHero";
import Button from "@/components/shared/controls/button/Button";
import InfiniteCarousel from "@/components/shared/carousel/InfiniteCarousel";
import RestaurantInfo from "@/restaurant/restaurantInfo/RestaurantInfo";
import RestaurantMenus from "@/restaurant/restaurantMenus/RestaurantMenus";
import RestaurantCategoryModal from "@/restaurant/restaurantCategoryModal/RestaurantCategoryModal";
import BookingModal from "@/restaurant/booking/bookingModal/BookingModal";
import RestaurantProfileEditModal from "@/restaurant/edit/restaurantProfileEditModal/RestaurantProfileEditModal";
import RestaurantInfoEditModal from "@/restaurant/edit/restaurantInfoEditModal/RestaurantInfoEditModal";
import RestaurantMenuEditModal from "@/restaurant/edit/restaurantMenuEditModal/RestaurantMenuEditModal";
import RestaurantCategoryEditModal from "@/restaurant/edit/restaurantCategoryEditModal/RestaurantCategoryEditModal";
import DeleteModal from "@/components/shared/deleteModal/DeleteModal";
import RestaurantDishesEditModal from "@/restaurant/edit/restaurantDishesEditModal/RestaurantDishesEditModal";
import PhotoEditModal from "@/components/shared/carousel/children/photoEditModal/PhotoEditModal";
import styles from "./restaurantPage.module.scss";
import RestaurantReviews from "@/components/screens/restaurant/restaurantReviews/RestaurantReviews";
import ReviewService from "@/services/restaurant/ReviewService";

export type RestaurantPageSearchParams = {
  categoryId?: string;
  state?: string[] | string;
};

export type RestaurantPageParams = {
  id: string;
};

type RestaurantPageProps = {
  searchParams: RestaurantPageSearchParams;
  params: RestaurantPageParams;
};

const RestaurantPage = async ({
  searchParams,
  params,
}: RestaurantPageProps) => {
  const state = searchParams.state;
  const id = params.id;

  const restaurant = await RestaurantService.getById(id);

  if ("detail" in restaurant) {
    redirect("/restaurants");
  }

  const photos = await RestaurantService.getPhotos(id);
  const menus = await RestaurantService.getMenus(id);
  const tags = await RestaurantService.getTags(id);
  const reviews = await ReviewService.getAll(id);

  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  const editable =
    role === "manager" && Number(id) === session?.user?.currentRestaurant;

  return (
    <main className={clsx(styles.wrapper)}>
      <RestaurantHero
        imgSrc={restaurant.preview}
        logoSrc={restaurant.logo}
        title={restaurant.name}
        description={restaurant.description}
        editable={editable}
        rating={restaurant.rating || 0}
      />
      <section className={styles.carousel}>
        {editable && (
          <Button
            btnType={"link"}
            btnStyle={"flat"}
            color={"gray"}
            iconSrc={"/icons/AddImage.svg"}
            href={`?state=photoEdit&type=create&restaurantId=${restaurant.id}`}
          >
            Добавить фото
          </Button>
        )}
        <InfiniteCarousel photos={photos} editable={editable} />
      </section>
      <section>
        <RestaurantInfo
          address={restaurant.address}
          cuisine={tags["Тип кухни"]}
          mealTime={tags["Время приема пищи"]}
          phoneNumber={restaurant.phone}
          website={restaurant.site}
          parking={tags["Парковка"]}
          restrictions={tags["Пищевые ограничения"]}
          schedule={restaurant.schedule}
          editable={editable}
        />
      </section>
      <section className={styles.menus}>
        <RestaurantMenus menus={menus} editable={editable} />
      </section>
      <section className={styles.reviews}>
        <RestaurantReviews
          restaurantId={id}
          reviews={reviews}
          editable={editable}
        />
      </section>

      {state && state.includes("category") && (
        <RestaurantCategoryModal searchParams={searchParams} />
      )}

      {state && state.includes("booking") && <BookingModal />}

      {editable && (
        <>
          {state && state.includes("profileEdit") && (
            <RestaurantProfileEditModal />
          )}
          {state && state.includes("infoEdit") && <RestaurantInfoEditModal />}
          {state && state.includes("menuEdit") && <RestaurantMenuEditModal />}
          {state && state.includes("categoryEdit") && (
            <RestaurantCategoryEditModal />
          )}
          {state && state.includes("dishesEdit") && (
            <RestaurantDishesEditModal />
          )}
          {state && state.includes("photoEdit") && <PhotoEditModal />}
        </>
      )}
      {state && state.includes("delete") && <DeleteModal />}
    </main>
  );
};

export default RestaurantPage;
