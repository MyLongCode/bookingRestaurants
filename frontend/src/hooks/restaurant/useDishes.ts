import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";

const useDishes = (id?: number | string) => {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["restaurant dishes"],
    queryFn: () => (!!id ? CategoryService.getDishes(id) : null),
  });

  return { data, isSuccess, refetch };
};

export default useDishes;
