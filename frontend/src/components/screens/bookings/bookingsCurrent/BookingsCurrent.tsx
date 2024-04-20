import BookingsCurrentCard from "@/screens/bookings/bookingsCurrentCard/BookingsCurrentCard";
import styles from "./bookingsCurrent.module.scss";
import { Booking } from "@/models/bookings/booking.type";

type BookingsCurrentProps = {
  bookings: Booking[];
};

const BookingsCurrent = async ({ bookings }: BookingsCurrentProps) => {
  if (!bookings || bookings.length === 0) {
    return <p className={styles.empty}>Список пуст</p>;
  }

  return (
    <ul className={styles.wrapper}>
      {bookings.map((booking) => {
        return (
          <li className={styles.item} key={booking.id}>
            <BookingsCurrentCard
              id={booking.id}
              date={booking.booking_date}
              time={booking.booking_time}
              peopleCount={booking.count_people}
              phone={"89434544660"}
              name={"Ивановна Анна Владимировна"}
              wishes={booking.wishes}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default BookingsCurrent;
