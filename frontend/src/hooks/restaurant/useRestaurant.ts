import { useQuery } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";

const useRestaurant = (id: number | string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => await RestaurantService.getById(id),
  });

  return { data, isPending, error, refetch };
};

export default useRestaurant;