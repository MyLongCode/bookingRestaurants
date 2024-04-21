import { Booking } from "@/models/bookings/booking.type";
import { axiosAuth } from "@/lib/axios";
import fetch from "@/lib/fetch";
import {revalidateBookings, revalidateUserBookings} from "@/lib/actions";
import { RestaurantBooking } from "@/models/bookings/restaurant-booking.type";
import { Page } from "@/models/page.type";
import { revalidateTag } from "next/cache";

export default class BookingService {
  public static async getByUser(id: string | number): Promise<Page<Booking>> {
    return await fetch.get(`/user/${id}/booking/`, "user bookings");
  }

  public static async getByRestaurant(
    id: string | number,
  ): Promise<Page<RestaurantBooking>> {
    return await fetch.get(`/restaurant/${id}/booking/`, "restaurant bookings");
  }

  public static async create(
    restaurantId: number | string,
    data: Partial<Booking>,
  ): Promise<Booking> {
    return await axiosAuth
      .post<Booking>(`/restaurant/${restaurantId}/booking/`, data)
      .then((res) => {
        revalidateUserBookings();
        return res.data;
      });
  }

  public static async accept(id: number | string): Promise<Booking> {
    return await axiosAuth.patch(`/booking/${id}/accept/`).then(async (res) => {
      await revalidateBookings();
      return res.data;
    });
  }

  public static async reject(id: number | string): Promise<Booking> {
    return await axiosAuth.patch(`/booking/${id}/reject/`).then(async (res) => {
      await revalidateBookings();
      return res.data;
    });
  }
}
