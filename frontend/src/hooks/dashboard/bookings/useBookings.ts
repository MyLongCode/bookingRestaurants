import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";
import BookingService from "@/services/booking/BookingService";

const useBookings = (id?: number | string) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurant bookings ${id}`],
    queryFn: () => (!!id ? BookingService.getByRestaurant(id) : null),
  });

  return { data, isSuccess };
};

export default useBookings;
