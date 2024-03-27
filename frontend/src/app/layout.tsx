import type { Metadata } from "next";
import "./globals.scss";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { comfortaa, montserrat } from "@/styles/fonts";
import Header from "@/components/shared/header/Header";
import Avatar from "@/components/shared/avatar/Avatar";

export const metadata: Metadata = {
  title: "Restaurants booking",
  description: "Service for booking restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.className, comfortaa.variable)}>
        <Header>
          <Header.Nav>
            <Header.NavLink href={"/"} text={"Главная"} />
            <Header.NavLink href={"/restaurants"} text={"Рестораны"} />
            <Header.NavLink href={"/favourites"} text={"Избранное"} />
          </Header.Nav>
          <Header.Notifications />
          <Avatar />
        </Header>
        {children}
      </body>
    </html>
  );
}
