import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";
import BookingService from "@/services/booking/BookingService";
import FavoriteService from "@/services/user/FavoriteService";
import { useSession } from "next-auth/react";
import { Page } from "@/models/page.type";
import { Booking } from "@/models/bookings/booking.type";

const useUserBookings = (page: number) => {
  const { data: session } = useSession();
  const { data, isSuccess } = useQuery({
    queryKey: ["user bookings"],
    queryFn: async (): Promise<Page<Booking>> =>
      await BookingService.getByUser(session!.user.id, page),
    staleTime: 0,
  });

  return { data, isSuccess };
};

export default useUserBookings;
