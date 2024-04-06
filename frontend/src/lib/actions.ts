"use server";

import { revalidateTag } from "next/cache";

export async function revalidateRestaurant() {
  revalidateTag("restaurant");
}

export async function revalidatePhotos() {
  revalidateTag("restaurant photos");
}