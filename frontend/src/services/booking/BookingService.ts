import { Booking } from "@/models/bookings/booking.type";
import { axiosAuth } from "@/lib/axios";
import fetch from "@/lib/fetch";
import { revalidateBookings } from "@/lib/actions";

export default class BookingService {
  public static async getByUser(id: string | number): Promise<Booking[]> {
    return fetch.get(`/user/${id}/booking/`, "user bookings");
  }

  public static async getByRetaurant(id: string | number): Promise<Booking[]> {
    return fetch.get(`/restaurant/${id}/booking/`, "restaurant bookings");
  }

  public static async create(
    restaurantId: number | string,
    data: Partial<Booking>,
  ): Promise<Booking> {
    return await axiosAuth
      .post<Booking>(`/restaurant/${restaurantId}/booking/`, data)
      .then((res) => {
        revalidateBookings();
        return res.data;
      });
  }
}
