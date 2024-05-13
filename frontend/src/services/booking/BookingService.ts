import { Booking } from "@/models/bookings/booking.type";
import { axiosAuth } from "@/lib/axios";
import fetch from "@/lib/fetch";
import {
  revalidateRestaurantBookings,
  revalidateUserBookings,
} from "@/lib/actions";
import { RestaurantBooking } from "@/models/bookings/restaurant-booking.type";
import { Page } from "@/models/page.type";
import {Restaurant} from "@/models/restaurant/restaurant.type";

export default class BookingService {
  public static async getByUser(
    id: string | number,
    page: number,
  ): Promise<Page<Booking>> {
    return await fetch
      .get(`/user/${id}/booking/?page=${page}`, "user bookings")
      .then(async (data: Page<Booking>) => {
        await revalidateUserBookings();
        data.results.reverse();
        return data;
      });
  }

  public static async getByRestaurant(
    id: string | number,
    page: number,
    query?: string,
  ): Promise<Page<RestaurantBooking>> {
    return await fetch
      .get(
        `/restaurant/${id}/booking/?${query ? `${query}&` : ""}page=${page}`,
        `restaurant bookings ${id}`,
      )
      .then(async (data: Page<RestaurantBooking>) => {
        await revalidateUserBookings();
        await revalidateRestaurantBookings(id);
        data.results.reverse();
        return data;
      });
  }

  public static async create(
    restaurantId: number | string,
    data: Partial<Booking>,
  ): Promise<Booking> {
    return await axiosAuth
      .post<Booking>(`/restaurant/${restaurantId}/booking/`, data)
      .then(async (res) => {
        await revalidateUserBookings();
        await revalidateRestaurantBookings(restaurantId);
        return res.data;
      });
  }

  public static async delete(id: number | string) {
    return await axiosAuth.delete(`/booking/${id}/`).then(async (res) => {
      await revalidateUserBookings();
      await revalidateRestaurantBookings(id);
      return res.data;
    });
  }

  public static async accept(id: number | string): Promise<Booking> {
    return await axiosAuth.patch(`/booking/${id}/accept/`).then(async (res) => {
      await revalidateUserBookings();
      await revalidateRestaurantBookings(id);
      return res.data;
    });
  }

  public static async reject(id: number | string): Promise<Booking> {
    return await axiosAuth.patch(`/booking/${id}/reject/`).then(async (res) => {
      await revalidateUserBookings();
      await revalidateRestaurantBookings(id);
      return res.data;
    });
  }
}
