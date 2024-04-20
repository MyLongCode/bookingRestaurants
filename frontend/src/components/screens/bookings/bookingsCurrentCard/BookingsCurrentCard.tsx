import styles from "./bookingsCurrentCard.module.scss";
import Button from "@/components/shared/controls/button/Button";
import BookingService from "@/services/booking/BookingService";
import fetch from "@/lib/fetch";
import { revalidateTag } from "next/cache";
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

const BookingsCurrentCard = async ({
  date,
  time,
  peopleCount,
  name,
  phone,
  wishes,
  id,
}: BookingsCurrentCardProps) => {
  const approve = async () => {
    "use server";
    await BookingService.changeStatus(id, {
      status: "Подтверждено",
    }).then((res) => console.log(res));
    revalidateTag("restaurant bookings");
  };

  const deny = async () => {
    "use server";
    await BookingService.changeStatus(id, {
      status: "Отменено",
    }).then((res) => console.log(res));
    revalidateTag("restaurant bookings");
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
        <form action={deny}>
          <Button
            btnType={"button"}
            btnStyle={"outlined"}
            fontSize={"small"}
            font={"comfortaa"}
            className={styles.deny}
            type={"submit"}
          >
            Отклонить
          </Button>
        </form>
        <form action={approve}>
          <Button
            btnType={"button"}
            btnStyle={"outlined"}
            font={"comfortaa"}
            className={styles.approve}
            type={"submit"}
          >
            Одобрить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingsCurrentCard;
