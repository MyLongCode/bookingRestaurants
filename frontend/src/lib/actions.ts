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

export async function revalidateFavorite() {
  revalidateTag("favorite");
}

export async function revalidateRestaurantTags() {
  revalidateTag("restaurant tags");
}

export async function revalidateUserBookings() {
  revalidateTag("user bookings");
}

export async function revalidateRestaurantBookings(id: number | string) {
  revalidateTag(`restaurant bookings ${id}`);
}

export async function revalidateRestaurantEmployees(id: number | string) {
  revalidateTag(`employees ${id}`);
}

export async function revalidateRestaurantReviews(id: number | string) {
  revalidateTag(`restaurant ${id} reviews`);
}
