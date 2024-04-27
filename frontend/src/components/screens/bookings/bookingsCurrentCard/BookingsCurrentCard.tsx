"use client";

import styles from "./bookingsCurrentCard.module.scss";
import Button from "@/components/shared/controls/button/Button";
import BookingService from "@/services/booking/BookingService";
import toast from "react-hot-toast";

type BookingsCurrentCardProps = {
  id: number | string;
  date: string;
  time: string;
  peopleCount: number;
  phone: string;
  name: string;
  wishes: string;
};

const BookingsCurrentCard = ({
  date,
  time,
  peopleCount,
  name,
  phone,
  wishes,
  id,
}: BookingsCurrentCardProps) => {
  const accept = () => {
    BookingService.accept(id).then(() => {
      toast.success("Отправлено подтверждение брони на номер телефона");
    });
  };

  const reject = () => {
    BookingService.reject(id).then(() => {
      toast.success("Отправлен отказ на номер телефона");
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>
        <p className={styles.label}>Дата</p>
        <p className={styles.dateValue}>
          {new Date(date).toLocaleDateString()} г
        </p>
      </div>
      <div className={styles.time}>
        <p className={styles.label}>Время</p>
        <p className={styles.timeValue}>{time.split(":").join("ч ")}м</p>
      </div>
      <div className={styles.container}>
        <p className={styles.value}>{peopleCount}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.value}>{name}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.value}>{phone}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.value}>{wishes || "Нет"}</p>
      </div>
      <div className={styles.active}>
        <Button
          btnType={"button"}
          btnStyle={"outlined"}
          fontSize={"small"}
          font={"comfortaa"}
          className={styles.deny}
          onClick={reject}
        >
          Отклонить
        </Button>
        <Button
          btnType={"button"}
          btnStyle={"outlined"}
          font={"comfortaa"}
          className={styles.approve}
          onClick={accept}
        >
          Одобрить
        </Button>
      </div>
    </div>
  );
};

export default BookingsCurrentCard;
