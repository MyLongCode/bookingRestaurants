import { Booking } from "@/models/bookings/booking.type";
import { axiosAuth } from "@/lib/axios";

export default class BookingService {
  public static async create(
    restaurantId: number | string,
    data: Partial<Booking>,
  ): Promise<Booking> {
    return await axiosAuth
      .post<Booking>(`/restaurant/${restaurantId}/booking/`, data)
      .then((res) => res.data);
  }
}
