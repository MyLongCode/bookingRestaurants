import BookingsHistoryRow from "@/screens/bookings/bookingsHistoryRow/BookingsHistoryRow";
import Table from "@/components/shared/table/Table";
import styles from "@/screens/profile/profileHistory/profileHistory.module.scss";
import { RestaurantBooking } from "@/models/bookings/restaurant-booking.type";

type BookingsHistoryTableProps = { bookings: RestaurantBooking[] };

const BookingsHistoryTable = async ({
  bookings,
}: BookingsHistoryTableProps) => {
  if (bookings.length === 0) return <p className={styles.empty}>Нет записей</p>;
  bookings.reverse();

  return (
    <Table columns={["Гость", "Кол-во гостей", "Дата", "Номер стола", "Бронь"]}>
      {bookings.map((booking) => {
        return (
          <BookingsHistoryRow
            key={booking.id}
            guestName={booking.user_fullname}
            guestPhone={booking.user_phone}
            guestsCount={booking.count_people}
            date={booking.booking_date}
            dateTime={booking.booking_time}
            table={1}
            status={booking.status}
          />
        );
      })}
    </Table>
  );
};

export default BookingsHistoryTable;
