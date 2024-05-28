import React from "react";
import HeaderNav from "@/components/shared/header/components/nav/HeaderNav";
import HeaderNavLink from "@/components/shared/header/components/navLink/HeaderNavLink";
import styles from "./header.module.scss";
import HeaderNotifications from "@/components/shared/header/components/notifications/HeaderNotifications";
import Avatar from "@/components/shared/avatar/Avatar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

type HeaderProps = {};

const Header = async ({}: HeaderProps) => {
  const session: Session | null = await getServerSession(authOptions);
  const role = session?.user?.role;
  return (
    <header className={styles.wrapper}>
      {role !== "owner" && role !== "employee" ? (
        <HeaderNav>
          <HeaderNavLink href={"/"} text={"Главная"} />
          <HeaderNavLink href={"/restaurants"} text={"Рестораны"} />
          {session?.user && (
            <HeaderNavLink href={"/favorite"} text={"Избранное"} />
          )}
        </HeaderNav>
      ) : (
        <HeaderNav>
          <HeaderNavLink href={"/restaurants"} text={"Рестораны"} />
          <HeaderNavLink
            href={"/dashboard/restaurant"}
            text={"Заведение"}
            additionalActive={"/restaurants/restaurant"}
          />

          <HeaderNavLink href={"/dashboard/bookings"} text={"Брони"} />
          {role === "owner" && (
            <HeaderNavLink href={"/dashboard/employees"} text={"Сотрудники"} />
          )}
          <HeaderNavLink href={"/favorite"} text={"Избранное"} />
        </HeaderNav>
      )}
      {session?.user && (
        <>
          <Avatar />
        </>
      )}
    </header>
  );
};

export default Header;
