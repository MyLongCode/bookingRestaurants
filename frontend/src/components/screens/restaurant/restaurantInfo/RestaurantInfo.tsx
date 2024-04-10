import React from "react";
import RestaurantWorkingHours from "./components/restaurantWorkingHours/RestaurantWorkingHours";
import styles from "./restaurantInfo.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { clsx } from "clsx";
import YandexMap from "@/components/shared/map/YandexMap";
import axios from "axios";
import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";
import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";

type RestaurantInfoProps = {
  cuisine?: RestaurantTag[];
  mealTime?: RestaurantTag[];
  restrictions?: RestaurantTag[];
  parking?: RestaurantTag[];
  schedule?: ScheduleDay[];
  address?: string;
  phoneNumber?: string;
  website?: string;
  editable?: boolean;
};

const RestaurantInfo = async ({
  address,
  cuisine,
  parking,
  phoneNumber,
  website,
  schedule,
  restrictions,
  mealTime,
  editable,
}: RestaurantInfoProps) => {
  // const response = await axios.get("https://geocode-maps.yandex.ru/1.x", {
  //   params: {
  //     apikey: process.env.YANDEX_API,
  //     geocode: address,
  //     format: "json",
  //   },
  // });
  //
  // const pos =
  //   response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  //     .split(" ")
  //     .reverse();

  return (
    <section className={styles.wrapper}>
      <section className={styles.info}>
        <h3>Подробнее</h3>
        <ul className={styles.tags}>
          <li>
            <h4>Тип кухни</h4>
            <p className={styles.text}>
              {cuisine ? cuisine.map((c) => c.name).join(", ") : "нет"}
            </p>
          </li>
          <li>
            <h4>Время приема пищи</h4>
            <p className={styles.text}>
              {mealTime ? mealTime.map((c) => c.name).join(", ") : "нет"}
            </p>
          </li>
          <li>
            <h4>Пищевые ограничения</h4>
            <p className={styles.text}>
              {restrictions
                ? restrictions.map((c) => c.name).join(", ")
                : "нет"}
            </p>
          </li>
          <li>
            <h4>Парковка</h4>
            <p className={styles.text}>
              {parking ? parking.map((c) => c.name).join(", ") : "нет"}
            </p>
          </li>
          <li>
            <h4>Часы работы</h4>
            {schedule ? <RestaurantWorkingHours days={schedule} /> : "нет"}
          </li>
          <li className={styles.contacts}>
            <h4>Контакты</h4>
            <address className={clsx(styles.text, styles.address)}>
              {address || "не указан"}
            </address>
            <a
              className={clsx(styles.text, styles.phone)}
              href={`tel: ${phoneNumber}`}
            >
              {phoneNumber || "не указан"}
            </a>
            <a className={clsx(styles.text, styles.website)} href={website}>
              {website || "не указан"}
            </a>
          </li>
        </ul>
        {editable && (
          <Button
            className={styles.btn}
            btnType={"link"}
            btnStyle={"filled"}
            color={"gray"}
            iconSrc={"/icons/Edit.svg"}
            fontSize={"small"}
            href={"?state=infoEdit"}
          >
            Изменить информацию
          </Button>
        )}
      </section>
      <section className={styles.mapContainer}>
        <h3>Карта</h3>
        {/*<YandexMap state={{ center: pos, zoom: 15 }} width={500} height={500} />*/}
      </section>
    </section>
  );
};

export default RestaurantInfo;
