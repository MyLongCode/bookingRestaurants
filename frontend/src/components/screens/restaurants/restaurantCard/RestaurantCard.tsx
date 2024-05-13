"use client";

import Image from "next/image";
import styles from "./restaurantCard.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { useRouter } from "next/navigation";
import FavoriteService from "@/services/user/FavoriteService";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import React, { useMemo } from "react";
import useFavorite from "@/hooks/user/useFavorite";
import { queryClient } from "@/app/providers";

type RestaurantCardProps = {
  title: string;
  logo: string;
  id: string | number;
};

const RestaurantCard = ({ logo, title, id }: RestaurantCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: favorite } = useFavorite();
  const isFavorite = useMemo(
    () => favorite?.some((fav) => fav.id === id),
    [favorite, id],
  );

  const handleClick = async () => {
    if (!session?.user?.id) return;

    if (favorite && isFavorite) {
      await FavoriteService.remove(session.user.id, id);

      toast.success(`${title} был убран из избранного`);
    } else {
      await FavoriteService.add(session.user.id, id);
      toast.success(`${title} был добавлен в избранное`);
    }

    await queryClient.invalidateQueries({
      queryKey: ["favorite"],
    });
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => router.push(`/restaurants/restaurant/${id}`)}
    >
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt={""} fill sizes={"1"} />
      </div>
      <p className={styles.title}>{title}</p>
      <Button
        className={styles.favoriteBtn}
        btnType={"button"}
        btnStyle={"icon"}
        padding={"no"}
        type={"button"}
        iconSrc={isFavorite ? "/icons/HearthFilled.svg" : "/icons/Hearth.svg"}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleClick();
        }}
      />
    </div>
  );
};

export default RestaurantCard;
