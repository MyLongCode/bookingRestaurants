import React, { ReactNode } from "react";
import styles from "./table.module.scss";

type HistoryTableProps = { columns: string[]; children?: ReactNode };

const Table = ({ children, columns }: HistoryTableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          {columns.map((column) => {
            return <td key={column}>{column}</td>;
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>{children}</tbody>
    </table>
  );
};

export default Table;
