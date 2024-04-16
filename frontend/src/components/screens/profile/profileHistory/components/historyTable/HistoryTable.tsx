import React from "react";
import styles from "./historyTable.module.scss";
import HistoryTableRow from "@/screens/profile/profileHistory/components/historyTableRow/HistoryTableRow";
import BookingService from "@/services/booking/BookingService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type HistoryTableProps = {};

const HistoryTable = async ({ ...props }: HistoryTableProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return;

  const bookings = await BookingService.getByUser(session?.user.id);

  bookings.reverse();

  if (bookings.length === 0) return <p className={styles.empty}>Нет записей</p>;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <td>Заведение</td>
            <td>Дата</td>
            <td className={styles.headStatus}>Статус</td>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {bookings.map((booking) => {
            return (
              <HistoryTableRow
                key={booking.id}
                restaurantName={booking.restaurant_name}
                restaurantAddress={"ул. Горького, 10А"}
                date={booking.booking_date}
                dateTime={booking.booking_time}
                status={booking.status}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
