import React, { ReactNode } from "react";
import HeaderNav from "@/components/shared/header/components/nav/HeaderNav";
import HeaderNavLink from "@/components/shared/header/components/navLink/HeaderNavLink";
import styles from "./header.module.scss";
import HeaderNotifications from "@/components/shared/header/components/notifications/HeaderNotifications";

type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <header className={styles.wrapper}>{children}</header>;
};

Header.Nav = HeaderNav;
Header.NavLink = HeaderNavLink;
Header.Notifications = HeaderNotifications;

export default Header;
