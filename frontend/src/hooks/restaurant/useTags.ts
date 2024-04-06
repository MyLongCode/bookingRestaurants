import { useQuery } from "@tanstack/react-query";
import TagService from "@/services/restaurant/TagService";

const useTags = () => {
  const { data, isSuccess, error } = useQuery({
    queryKey: ["restaurant tags"],
    queryFn: async () => await TagService.getAll(),
  });

  return { data, isSuccess, error };
};

export default useTags;
