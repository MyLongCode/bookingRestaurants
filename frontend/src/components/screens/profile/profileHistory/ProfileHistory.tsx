import styles from "./profileHistory.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BookingService from "@/services/booking/BookingService";
import Table from "@/components/shared/table/Table";
import HistoryTableRow from "./components/historyTableRow/HistoryTableRow";

const ProfileHistory = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return;

  const bookings = await BookingService.getByUser(session?.user.id);
  bookings.results.reverse();

  if (bookings.results.length === 0)
    return <p className={styles.empty}>Нет записей</p>;

  return (
    <section className={styles.wrapper}>
      <Table columns={["Заведение", "Дата", "Статус"]}>
        {bookings.results.map((booking, index) => {
          return (
            <HistoryTableRow
              key={booking.id}
              id={booking.id}
              restaurantName={booking.restaurant_name}
              restaurantAddress={booking.restaurant_address}
              date={booking.booking_date}
              dateTime={booking.booking_time}
              status={booking.status}
              className={styles[`booking-${index}`]}
            />
          );
        })}
      </Table>
    </section>
  );
};

export default ProfileHistory;
