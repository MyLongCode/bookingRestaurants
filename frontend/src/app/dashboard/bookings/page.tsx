import styles from "./bookingsPage.module.scss";
import Table from "@/components/shared/table/Table";
import BookingsHistoryRow from "@/screens/bookings/bookingsHistoryRow/BookingsHistoryRow";
import BookingService from "@/services/booking/BookingService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserService from "@/services/user/UserService";
import { Booking } from "@/models/bookings/booking.type";
import BookingsHistoryTable from "@/screens/bookings/bookingsHistoryTable/BookingsHistoryTable";
import BookingsCurrent from "@/screens/bookings/bookingsCurrent/BookingsCurrent";
import toast from "react-hot-toast";

type BookingsPageProps = {};

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);
  const bookings = await BookingService.getByRestaurant(
    session?.user.currentRestaurant!,
  );

  return (
    <div className={styles.wrapper}>
      <section className={styles.history}>
        <BookingsHistoryTable
          bookings={bookings.results.filter(
            (booking) => booking.status !== "Ожидается",
          )}
        />
      </section>
      <section className={styles.current}>
        <h2>Текущие заявки</h2>
        <BookingsCurrent
          bookings={bookings.results.filter(
            (booking) => booking.status === "Ожидается",
          )}
        />
      </section>
    </div>
  );
};

export default BookingsPage;
