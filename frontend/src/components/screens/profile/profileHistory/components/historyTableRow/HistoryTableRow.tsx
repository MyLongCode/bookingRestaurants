import React from "react";
import styles from "./historyTableRow.module.scss";
import { clsx } from "clsx";

type HistoryTableRowProps = {
  restaurantName: string;
  restaurantAddress: string;
  date: string;
  dateTime: string;
  status: "complete" | "waiting" | "approved" | "canceled";
};

enum StatusText {
  "complete" = "Завершено",
  "waiting" = "Ожидание",
  "approved" = "Подтверждено",
  "canceled" = "Отменено",
}

const HistoryTableRow = ({
  restaurantName,
  restaurantAddress,
  status,
  date,
  dateTime,
}: HistoryTableRowProps) => {
  return (
    <tr className={styles.wrapper}>
      <th scope={"row"} className={styles.info}>
        <h3>{restaurantName}</h3>
        <address className={styles.address}>{restaurantAddress}</address>
      </th>
      <td>
        <p className={styles.date}>
          {date} <span>{dateTime}</span>
        </p>
      </td>
      <td>
        <p className={clsx(styles.status, styles[status])}>
          {StatusText[status]}
        </p>
      </td>
    </tr>
  );
};

export default HistoryTableRow;
