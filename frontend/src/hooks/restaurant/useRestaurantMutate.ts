import { useMutation } from "@tanstack/react-query";
import RestaurantService from "@/services/restaurant/RestaurantService";
import { Restaurant } from "@/models/restaurant/restaurant.type";

const useRestaurantMutate = (id: string | number) => {
  const { data, mutate } = useMutation({
    mutationKey: ["restaurant"],
    mutationFn: async (patchData: Partial<Restaurant>) => {
      return await RestaurantService.patchProfile(id, patchData);
    },
  });

  return { data, mutate };
};

export default useRestaurantMutate;
