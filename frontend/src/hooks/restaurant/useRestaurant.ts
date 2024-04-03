import { useQuery } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";

const useRestaurant = async (id: number | string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => await RestaurantService.getById(id),
  });

  return { data, isPending, error };
};

export default useRestaurant;