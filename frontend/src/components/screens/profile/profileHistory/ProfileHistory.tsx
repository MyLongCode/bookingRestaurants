import React from "react";
import styles from "./profileHistory.module.scss";
import HistoryTable from "@/screens/profile/profileHistory/components/historyTable/HistoryTable";

const ProfileHistory = () => {
  return (
    <section className={styles.wrapper}>
      <h2>История бронирования</h2>
      <HistoryTable />
    </section>
  );
};

export default ProfileHistory;
