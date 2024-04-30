import { useQuery } from "@tanstack/react-query";
import PhotoService from "@/services/restaurant/PhotoService";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { Page } from "@/models/page.type";
import { Restaurant } from "@/models/restaurant/restaurant.type";

const useRestaurants = (tags?: string) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurants`],
    queryFn: async () => {
      return await RestaurantService.getAll(tags);
    },
  });

  return { data, isSuccess };
};

export default useRestaurants;
