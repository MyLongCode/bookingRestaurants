import React from "react";
import styles from "./bookingsHistoryRow.module.scss";
import { clsx } from "clsx";

type BookingsHistoryRowProps = {
  guestName: string;
  guestPhone: string;
  guestsCount: number | string;
  date: string;
  dateTime: string;
  table: number | string;
  status: "Завершено" | "Подтверждено" | "Отменено" | "Ожидается";
};

const BookingsHistoryRow = ({
  guestName,
  guestsCount,
  guestPhone,
  date,
  dateTime,
  status,
  table,
}: BookingsHistoryRowProps) => {
  return (
    <tr className={styles.wrapper}>
      <th scope={"row"} className={styles.guest}>
        <h3>{guestName}</h3>
        <a type={"tel"} href={guestPhone} className={styles.phone}>
          {guestPhone}
        </a>
      </th>
      <td>
        <p className={styles.guests}>{guestsCount}</p>
      </td>
      <td>
        <p className={styles.date}>
          {date} <span>{dateTime}</span>
        </p>
      </td>
      <td>
        <p className={styles.table}>{table}</p>
      </td>
      <td>
        <p className={clsx(styles.status, styles[status])}>
          {status.toLowerCase()}
        </p>
      </td>
    </tr>
  );
};

export default BookingsHistoryRow;
