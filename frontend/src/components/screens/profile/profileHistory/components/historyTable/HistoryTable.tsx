import React from "react";
import styles from "./historyTable.module.scss";
import HistoryTableRow from "@/screens/profile/profileHistory/components/historyTableRow/HistoryTableRow";

type HistoryTableProps = {};

const HistoryTable = ({ ...props }: HistoryTableProps) => {
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
          <HistoryTableRow
            restaurantName={"Ресторан “РыбаLove”"}
            restaurantAddress={"ул. Горького, 10А"}
            date={"12.03.2024"}
            dateTime={"18:00-20:30"}
            status={"waiting"}
          />
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
