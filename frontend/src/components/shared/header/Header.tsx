import React from "react";
import HeaderNav from "@/components/shared/header/components/nav/HeaderNav";
import HeaderNavLink from "@/components/shared/header/components/navLink/HeaderNavLink";
import styles from "./header.module.scss";
import HeaderNotifications from "@/components/shared/header/components/notifications/HeaderNotifications";
import Avatar from "@/components/shared/avatar/Avatar";
import { getServerSession } from "next-auth";

type HeaderProps = {};

const Header = async ({}: HeaderProps) => {
  const session = await getServerSession();
  return (
    <header className={styles.wrapper}>
      <HeaderNav>
        <HeaderNavLink href={"/"} text={"Главная"} />
        <HeaderNavLink href={"/restaurants"} text={"Рестораны"} />
        {session?.user && (
          <HeaderNavLink href={"/favourites"} text={"Избранное"} />
        )}
      </HeaderNav>
      {session?.user && (
        <>
          <HeaderNotifications />
          <Avatar />
        </>
      )}
    </header>
  );
};

export default Header;
