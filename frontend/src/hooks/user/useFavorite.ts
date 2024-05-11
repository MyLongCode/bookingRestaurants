import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";
import BookingService from "@/services/booking/BookingService";
import FavoriteService from "@/services/user/FavoriteService";
import { useSession } from "next-auth/react";

const useFavorite = () => {
  const { data: session } = useSession();
  const { data, isSuccess } = useQuery({
    queryKey: ["favorite"],
    queryFn: async () =>
      session?.user ? await FavoriteService.getAll(session.user.id) : [],
    staleTime: 0,
  });

  return { data, isSuccess };
};

export default useFavorite;
