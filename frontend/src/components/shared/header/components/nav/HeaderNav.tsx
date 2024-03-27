import React, { ReactNode } from "react";
import styles from "./headerNav.module.scss";

type HeaderNavProps = {
  children?: ReactNode;
};

const HeaderNav = ({ children }: HeaderNavProps) => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

export default HeaderNav;
