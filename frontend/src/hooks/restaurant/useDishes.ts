import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";

const useDishes = (id?: number | string) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurant dishes ${id}`],
    queryFn: () => (!!id ? CategoryService.getDishes(id) : null),
  });

  return { data, isSuccess };
};

export default useDishes;
