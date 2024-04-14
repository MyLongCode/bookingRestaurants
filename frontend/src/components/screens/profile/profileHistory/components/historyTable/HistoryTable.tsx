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
                restaurantName={`Ресторан ${booking.id}`}
                restaurantAddress={"ул. Горького, 10А"}
                date={"12.03.2024"}
                dateTime={"18:00-20:30"}
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
