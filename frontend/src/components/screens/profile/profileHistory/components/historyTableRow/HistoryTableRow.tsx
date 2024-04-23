import React from "react";
import styles from "./historyTableRow.module.scss";
import { clsx } from "clsx";

type HistoryTableRowProps = {
  restaurantName: string;
  restaurantAddress: string;
  date: string;
  dateTime: string;
  status: "Завершено" | "Ожидается" | "Подтверждено" | "Отклонено";
};

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
          {new Date(date).toLocaleDateString()} <span>{dateTime}</span>
        </p>
      </td>
      <td>
        <p className={clsx(styles.status, styles[status])}>
          {status.toLowerCase()}
        </p>
      </td>
    </tr>
  );
};

export default HistoryTableRow;
