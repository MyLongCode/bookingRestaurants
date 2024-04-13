import React from "react";
import Image from "next/image";
import Button from "@/components/shared/controls/button/Button";
import Input from "@/components/shared/controls/input/Input";
import styles from "./profilePersonal.module.scss";
import ProfileInput from "@/screens/profile/profilePersonal/components/profileInput/ProfileInput";

const ProfilePersonal = () => {
  return (
    <section className={styles.wrapper}>
      <h2>Личные данные</h2>
      <div className={styles.avatarContainer}>
        <Image
          className={styles.avatar}
          src={"/DefaultUserAvatar.svg"}
          alt={"Аватар пользователя"}
          width={80}
          height={80}
        />
        <Button btnType={"link"} btnStyle={"flat"} href={"#"}>
          Изменить фото
        </Button>
      </div>
      <div className={styles.inputs}>
        <ProfileInput variant={"name"} />
        <ProfileInput variant={"email"} />
        <ProfileInput variant={"birthday"} />
      </div>
    </section>
  );
};

export default ProfilePersonal;
