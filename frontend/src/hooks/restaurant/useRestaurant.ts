import { useQuery } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";

const useRestaurant = (id: number | string) => {
  const { data, isSuccess, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => await RestaurantService.getById(id),
  });

  return { data, isSuccess, error };
};

export default useRestaurant;
