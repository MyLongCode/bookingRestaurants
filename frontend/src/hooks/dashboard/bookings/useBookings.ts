import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";
import BookingService from "@/services/booking/BookingService";

export type Status = "Завершено" | "Ожидается" | "Подтверждено" | "Отклонено";

const useBookings = (
  page: number,
  id?: number | string,
  status?: Status[] | Status,
) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurant bookings ${id}`],
    queryFn: () =>
      !!id ? BookingService.getByRestaurant(id, page, status) : null,
  });

  return { data, isSuccess };
};

export default useBookings;
