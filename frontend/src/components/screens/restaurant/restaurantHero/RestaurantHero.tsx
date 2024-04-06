import React from "react";
import Image from "next/image";
import styles from "./restaurantHero.module.scss";
import Rating from "@/components/shared/raiting/Rating";
import Button from "@/components/shared/controls/button/Button";

type RestaurantHeroProps = {
  imgSrc: string;
  logoSrc: string;
  title: string;
  description: string;
};

const RestaurantHero = ({
  imgSrc,
  logoSrc,
  description,
  title,
}: RestaurantHeroProps) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.preview}
          src={imgSrc}
          alt={"Фон ресторана"}
          fill
          sizes={"1"}
          priority
        />
      </div>
      <div className={styles.info}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src={logoSrc}
            alt={"Логотип"}
            fill
            sizes={"1"}
          />
        </div>
        <div className={styles.info__wrapper}>
          <Rating className={styles.rating} value={3.56} withNumber withText />
          <div className={styles.info__text}>
            <h2 className={styles.title}>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button btnType={"button"} style={"filled"} fontSize={"small"}>
          Забронировать столик
        </Button>
        <Button
          btnType={"link"}
          color={"gray"}
          fontSize={"small"}
          style={"filled"}
          iconSrc={"/icons/Edit.svg"}
          href={"?state=restaurantProfileEdit"}
        >
          Редактировать профиль ресторана
        </Button>
      </div>
    </section>
  );
};

export default RestaurantHero;
