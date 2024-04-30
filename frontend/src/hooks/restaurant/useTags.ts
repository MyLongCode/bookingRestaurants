import { useQuery } from "@tanstack/react-query";
import TagService from "@/services/restaurant/TagService";

const useTags = () => {
  const { data, isSuccess, error } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => await TagService.getAll(),
    staleTime: 3600,
  });

  return { data, isSuccess, error };
};

export default useTags;
