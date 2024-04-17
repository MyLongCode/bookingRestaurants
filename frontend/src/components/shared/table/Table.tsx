import React, { ReactNode } from "react";
import styles from "./table.module.scss";

type HistoryTableProps = { columns: string[]; children: ReactNode };

const Table = async ({ children, columns }: HistoryTableProps) => {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default Table;
