import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./avatar.module.scss";

const Avatar = () => {
  return (
    <Link href={"/profile"} className={styles.wrapper}>
      <Image
        className={styles.img}
        src="/DefaultUserAvatar.svg"
        alt="Аватар пользователя"
        fill
      />
    </Link>
  );
};

export default Avatar;
