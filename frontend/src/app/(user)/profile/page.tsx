import React, { Suspense } from "react";
import styles from "./profile.module.scss";
import ProfilePersonal from "@/screens/profile/profilePersonal/ProfilePersonal";
import ProfileHistory from "@/screens/profile/profileHistory/ProfileHistory";
import Loader from "@/components/shared/loader/Loader";

const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <ProfilePersonal />
      <div className={styles.history}>
        <h2>История бронирования</h2>
        <Suspense
          fallback={
            <span className={styles.loader}>
            <Loader/>
          </span>
          }
        >
          <ProfileHistory/>
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
