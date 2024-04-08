import { useQuery } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";

const useRestaurantTags = (id: number | string) => {
  const { data, isSuccess, error } = useQuery({
    queryKey: ["restaurant tags"],
    queryFn: async () => await RestaurantService.getTags(id),
  });

  return { data, isSuccess, error };
};

export default useRestaurantTags;
