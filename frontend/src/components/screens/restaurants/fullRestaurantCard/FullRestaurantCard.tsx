"use client";

import Image from "next/image";
import styles from "./fullRestaurantCard.module.scss";
import Link from "next/link";
import RestaurantService from "@/services/restaurant/RestaurantService";
import rating from "@/components/shared/raiting/Rating";
import Button from "@/components/shared/controls/button/Button";
import useRestaurantTags from "@/hooks/restaurant/useRestaurantTags";
import { is } from "immutable";
import Loader from "@/components/shared/loader/Loader";
import Rating from "@/components/shared/raiting/Rating";
import { useSession } from "next-auth/react";
import useFavorite from "@/hooks/user/useFavorite";
import { useMemo } from "react";
import FavoriteService from "@/services/user/FavoriteService";
import toast from "react-hot-toast";
import {queryClient} from "@/app/providers";

type FullRestaurantCardProps = {
  title: string;
  logo: string;
  rating: number;
  address: string;
  id: string | number;
};

const FullRestaurantCard = ({
  logo,
  title,
  id,
  rating,
  address,
}: FullRestaurantCardProps) => {
  const { data: tags, isSuccess } = useRestaurantTags(id);
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

  if (!isSuccess || !tags) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt={""} fill sizes={"1"} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoTopContainer}>
          <p className={styles.title}>{title}</p>
          <Button
            className={styles.favoriteBtn}
            btnType={"button"}
            btnStyle={"icon"}
            padding={"no"}
            iconSrc={
              isFavorite ? "/icons/HearthFilled.svg" : "/icons/Hearth.svg"
            }
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await handleClick();
            }}
          />
          <div className={styles.rating}>
            <span>Рейтинг:</span>{" "}
            <Rating className={styles.ratingStars} value={rating || 0} />{" "}
            <span>{rating?.toPrecision(2) || 0}</span>
          </div>
        </div>
        <address className={styles.address}>{address}</address>
        <p className={styles.tags}>
          Кухня: {tags["Тип кухни"].map((tag) => tag.name).join(", ")}
        </p>
        <Button
          btnType={"link"}
          btnStyle={"outlined"}
          href={`/restaurants/restaurant/${id}`}
          font={"comfortaa"}
          fontSize={"small"}
          className={styles.btn}
          scroll={true}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default FullRestaurantCard;
