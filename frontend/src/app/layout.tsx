import type { Metadata } from "next";
import "./globals.scss";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { comfortaa, montserrat } from "@/styles/fonts";
import Header from "@/components/shared/header/Header";
import Avatar from "@/components/shared/avatar/Avatar";
import { YMaps } from "@pbe/react-yandex-maps";
import Footer from "@/components/shared/footer/Footer";
import {SessionProvider, signIn} from "next-auth/react";
import { CustomProviders } from "@/app/providers";
import localFont from "next/font/local";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export const metadata: Metadata = {
  title: "Restaurants booking",
  description: "Service for booking restaurants",
};

const gothamPro = localFont({
  src: "./gothamPro.ttf",
  variable: "--font-gotham-pro",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session && session?.error === "RefreshAccessTokenError") {
    await signIn();
  }

  return (
    <html lang="en">
      <body className={clsx(comfortaa.className, montserrat.variable)}>
        <Header />
        <CustomProviders>{children}</CustomProviders>
        <div id={"portal"} />
        <Footer />
      </body>
    </html>
  );
}
