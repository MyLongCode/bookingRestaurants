import React from "react";
import styles from "./profile.module.scss";
import ProfilePersonal from "@/screens/profile/profilePersonal/ProfilePersonal";
import ProfileHistory from "@/screens/profile/profileHistory/ProfileHistory";

const ProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <ProfilePersonal />
      <ProfileHistory />
    </div>
  );
};

export default ProfilePage;
