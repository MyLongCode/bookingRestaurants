import React from "react";
import styles from "./restaurantWorkingHours.module.scss";

const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

type RestaurantWorkingHoursProps = {
  hours: string[];
};

const RestaurantWorkingHours = ({ hours }: RestaurantWorkingHoursProps) => {
  return (
    <ul className={styles.list}>
      {hours.map((time, index) => {
        return (
          <li key={index}>
            <p className={styles.day}>{days[index]}</p>
            <p className={styles.time}>{time}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default RestaurantWorkingHours;
