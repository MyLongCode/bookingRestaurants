import { Comfortaa, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600"],
});
export const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  weight: ["500", "600", "700"],
});
export const gothamPro = localFont({
  src: "./gothampro.ttf",
  variable: "--font-gotham-pro",
});
