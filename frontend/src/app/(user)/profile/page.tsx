import React, { Suspense } from "react";
import styles from "./profile.module.scss";
import ProfilePersonal from "@/screens/profile/profilePersonal/ProfilePersonal";
import ProfileHistory from "@/screens/profile/profileHistory/ProfileHistory";
import Loader from "@/components/shared/loader/Loader";
import DeleteModal from "@/components/shared/deleteModal/DeleteModal";

type ProfilePageSearchParams = {
  state?: string | string[];
};

type ProfilePageProps = {
  searchParams: ProfilePageSearchParams;
};

const ProfilePage = ({ searchParams }: ProfilePageProps) => {
  const state = searchParams.state;

  return (
    <div className={styles.wrapper}>
      <ProfilePersonal />
      <div className={styles.history}>
        <h2>История бронирования</h2>
        <Suspense
          fallback={
            <span className={styles.loader}>
              <Loader />
            </span>
          }
        >
          <ProfileHistory />
        </Suspense>
      </div>

      {state?.includes("delete") && <DeleteModal />}
    </div>
  );
};

export default ProfilePage;
