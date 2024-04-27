import type { Metadata } from "next";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { comfortaa, montserrat } from "@/styles/fonts";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { signIn } from "next-auth/react";
import { CustomProviders } from "@/app/providers";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Toaster } from "react-hot-toast";
import "./globals.scss";
import "@/styles/toast-custom.scss";

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
        <Toaster
          position={"bottom-right"}
          containerClassName={"app-toast-container"}
          toastOptions={{
            success: {
              className: "app-toast_success",
            },
            error: {
              className: "app-toast_error",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
