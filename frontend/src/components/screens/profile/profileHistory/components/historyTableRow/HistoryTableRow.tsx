import React from "react";
import styles from "./historyTableRow.module.scss";
import { clsx } from "clsx";
import Button from "@/components/shared/controls/button/Button";

type HistoryTableRowProps = {
  id: string | number;
  restaurantName: string;
  restaurantAddress: string;
  date: string;
  dateTime: string;
  status: "Завершено" | "Ожидается" | "Подтверждено" | "Отклонено";
  className?: string;
};

const HistoryTableRow = ({
  id,
  restaurantName,
  restaurantAddress,
  status,
  date,
  dateTime,
  className,
}: HistoryTableRowProps) => {
  return (
    <tr className={clsx(styles.wrapper, className)}>
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
          {status === "Ожидается" ||
            (status === "Подтверждено" && (
              <Button
                btnType={"link"}
                btnStyle={"icon"}
                iconSrc={"/icons/Delete.svg"}
                href={`?state=delete&type=booking&deleteId=${id}`}
              />
            ))}
        </p>
      </td>
    </tr>
  );
};

export default HistoryTableRow;
