import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/restaurant/CategoryService";

const useCategory = (id?: number | string) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`restaurant category ${id}`],
    queryFn: () => (!!id ? CategoryService.getById(id) : null),
  });

  return { data, isSuccess };
};

export default useCategory;
