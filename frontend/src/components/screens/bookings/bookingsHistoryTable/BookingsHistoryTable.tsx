import BookingsHistoryRow from "@/screens/bookings/bookingsHistoryRow/BookingsHistoryRow";
import Table from "@/components/shared/table/Table";
import styles from "@/screens/profile/profileHistory/profileHistory.module.scss";
import { Booking } from "@/models/bookings/booking.type";

type BookingsHistoryTableProps = { bookings: Booking[] };

const BookingsHistoryTable = async ({
  bookings,
}: BookingsHistoryTableProps) => {
  if (bookings.length === 0) return <p className={styles.empty}>Нет записей</p>;

  return (
    <Table columns={["Гость", "Кол-во гостей", "Дата", "Номер стола", "Бронь"]}>
      {bookings.map((booking) => {
        return (
          <BookingsHistoryRow
            key={booking.id}
            guestName={"1232354535 45345345435 43534534534"}
            guestPhone={"12323123"}
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
