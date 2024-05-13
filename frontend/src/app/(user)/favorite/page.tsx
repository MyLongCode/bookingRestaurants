import React from "react";
import RestaurantsList from "@/screens/restaurants/restaurantsList/RestaurantsList";
import FavoriteService from "@/services/user/FavoriteService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import styles from "./favorite.module.scss";
import Loader from "@/components/shared/loader/Loader";

const FavoritePage = async () => {
  const session = await getServerSession(authOptions);

  const favorite = await FavoriteService.getAll(session!.user.id);

  if (!favorite) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <h2>Избранное</h2>
      {favorite?.length > 0 ? (
        <RestaurantsList restaurants={favorite} variant={"full"} />
      ) : (
        <p className={styles.empty}>Список пуст</p>
      )}
    </div>
  );
};

export default FavoritePage;
