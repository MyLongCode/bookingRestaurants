import { Booking } from "@/models/bookings/booking.type";
import { axiosAuth } from "@/lib/axios";
import fetch from "@/lib/fetch";
import { revalidateBookings } from "@/lib/actions";

export default class BookingService {
  public static async getByUser(id: string | number): Promise<Booking[]> {
    return await fetch.get(`/user/${id}/booking/`, "user bookings");
  }

  public static async getByRestaurant(id: string | number): Promise<Booking[]> {
    return await fetch.get(`/restaurant/${id}/booking/`, "restaurant bookings");
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

  public static async changeStatus(
    id: number | string,
    data: { status: string },
  ): Promise<Booking> {
    return await fetch.patch(
      `/booking/${id}/status/`,
      "restaurant bookings",
      data,
    );
  }
}
