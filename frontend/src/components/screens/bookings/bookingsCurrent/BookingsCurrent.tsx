import BookingsCurrentCard from "@/screens/bookings/bookingsCurrentCard/BookingsCurrentCard";
import styles from "./bookingsCurrent.module.scss";
import BookingService from "@/services/booking/BookingService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BookingsCurrent = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.currentRestaurant) return null;

  const bookings = await BookingService.getByRestaurant(
    session.user.currentRestaurant,
    1,
    "Ожидается"
  ).then((data) =>
    data.results.filter((booking) => booking.status === "Ожидается"),
  );

  if (!bookings || bookings.length === 0) {
    return <p className={styles.empty}>Список пуст</p>;
  }

  return (
    <div>
      <ul className={styles.wrapper}>
        {bookings.map((booking) => {
          return (
            <li className={styles.item} key={booking.id}>
              <BookingsCurrentCard
                id={booking.id}
                date={booking.booking_date}
                time={booking.booking_time}
                peopleCount={booking.count_people}
                phone={booking.user_phone}
                name={booking.user_fullname}
                wishes={booking.wishes}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingsCurrent;
