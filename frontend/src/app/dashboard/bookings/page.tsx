import styles from "./bookingsPage.module.scss";
import Table from "@/components/shared/table/Table";
import BookingsHistoryRow from "@/screens/bookings/bookingsHistoryRow/BookingsHistoryRow";
import BookingService from "@/services/booking/BookingService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserService from "@/services/user/UserService";
import { Booking } from "@/models/bookings/booking.type";

type BookingsPageProps = {};

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  let bookings: Booking[] =
    session && session.user.currentRestaurant
      ? await BookingService.getByRetaurant(session.user.currentRestaurant)
      : [];

  return (
    <div className={styles.wrapper}>
      <section className={styles.history}>
        <Table
          columns={["Гость", "Кол-во гостей", "Дата", "Номер стола", "Бронь"]}
        >
          {bookings.map(async (booking) => {
            const user = await UserService.getById(booking.user);
            return (
              <BookingsHistoryRow
                key={booking.id}
                guestName={user.full_name}
                guestPhone={user.phone_number}
                guestsCount={booking.count_people}
                date={booking.booking_date}
                dateTime={booking.booking_time}
                table={1}
                status={booking.status}
              />
            );
          })}
        </Table>
      </section>
      <section className={styles.current}></section>
    </div>
  );
};

export default BookingsPage;
