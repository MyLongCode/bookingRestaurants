import styles from "./profileHistory.module.scss";
import HistoryTable from "@/screens/profile/profileHistory/components/historyTable/HistoryTable";

const ProfileHistory = async () => {
  return (
    <section className={styles.wrapper}>
      <HistoryTable />
    </section>
  );
};

export default ProfileHistory;
