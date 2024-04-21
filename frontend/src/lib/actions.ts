"use server";

import { revalidateTag } from "next/cache";

export async function revalidateRestaurant() {
  revalidateTag("restaurant");
}

export async function revalidatePhotos() {
  revalidateTag("restaurant photos");
}

export async function revalidateMenus() {
  revalidateTag("restaurant menu");
}

export async function revalidateRestaurantTags() {
  revalidateTag("restaurant tags");
}

export async function revalidateUserBookings() {
  revalidateTag("user bookings");
}

export async function revalidateRestaurantBookings() {
  revalidateTag("restaurant bookings");
}

export async function revalidateBookings() {
  await revalidateUserBookings();
  await revalidateRestaurantBookings();
}
