import { useQuery } from "@tanstack/react-query";
import PhotoService from "@/services/restaurant/PhotoService";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { Page } from "@/models/page.type";
import { Restaurant } from "@/models/restaurant/restaurant.type";

const useRestaurants = (tags?: string) => {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`restaurants`],
    queryFn: async () => {
      return tags
        ? await RestaurantService.getAll(tags)
        : await RestaurantService.getAll();
    },
    staleTime: 0,
  });

  return { data, isSuccess, refetch };
};

export default useRestaurants;
