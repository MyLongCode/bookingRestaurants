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

  if (!isSuccess || !tags) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt={""} fill sizes={"1"} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.rating}>
          <span>Рейтинг:</span> <Rating value={rating || 0} /> <span>{rating || 0}</span>
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
