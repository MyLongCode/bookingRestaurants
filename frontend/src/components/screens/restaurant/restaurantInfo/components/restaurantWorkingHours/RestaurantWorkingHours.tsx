import React from "react";
import styles from "./restaurantWorkingHours.module.scss";
import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";

type RestaurantWorkingHoursProps = {
  days: ScheduleDay[];
};

const RestaurantWorkingHours = ({ days }: RestaurantWorkingHoursProps) => {
  return (
    <ul className={styles.list}>
      {days.map((day) => {
        return (
          <li key={day.dayName}>
            <p className={styles.day}>{day.dayName}</p>
            <p className={styles.time}>{`${day.timeStart}-${day.timeEnd}`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default RestaurantWorkingHours;
