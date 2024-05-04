import { useQuery } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";

const useRestaurants = (tags?: string, name?: string) => {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`restaurants`],
    queryFn: async () => {
      return tags
        ? await RestaurantService.getAll(tags)
        : name
          ? await RestaurantService.getAll(undefined, name)
          : await RestaurantService.getAll();
    },
    staleTime: 0,
  });

  return { data, isSuccess, refetch };
};

export default useRestaurants;
