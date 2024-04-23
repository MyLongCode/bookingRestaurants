import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";
import BookingService from "@/services/booking/BookingService";

const useBookings = (
  page: number,
  id?: number | string,
  query?: string,
) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurant bookings ${!!query ? `${query} ` : ""}${id}`],
    queryFn: () =>
      !!id ? BookingService.getByRestaurant(id, page, query) : null,
  });

  return { data, isSuccess };
};

export default useBookings;
