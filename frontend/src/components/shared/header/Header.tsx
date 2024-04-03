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
  if (session?.user) {
    session.user.isManager = true;
  }

  return (
    <header className={styles.wrapper}>
      {!session?.user.isManager ? (
        <HeaderNav>
          <HeaderNavLink href={"/"} text={"Главная"} />
          <HeaderNavLink href={"/restaurants"} text={"Рестораны"} />
          {session?.user && (
            <HeaderNavLink href={"/favourites"} text={"Избранное"} />
          )}
        </HeaderNav>
      ) : (
        <HeaderNav>
          <HeaderNavLink href={"/restaurant"} text={"Заведение"} />
          <HeaderNavLink href={"/bookings"} text={"Брони"} />
          <HeaderNavLink href={"/employees"} text={"Сотрудники"} />
          <HeaderNavLink href={"/statistics"} text={"Статистика"} />
        </HeaderNav>
      )}
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
