import React from "react";
import Image from "next/image";
import styles from "./headerNotifications.module.scss";

const HeaderNotifications = () => {
  return (
    <div className={styles.wrapper}>
      <Image src={"/Bell.png"} alt={"Уведомления"} fill sizes={"1"} />
    </div>
  );
};

export default HeaderNotifications;
