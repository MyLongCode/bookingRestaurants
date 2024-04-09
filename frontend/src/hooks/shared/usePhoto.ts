import { useQuery } from "@tanstack/react-query";
import PhotoService from "@/services/restaurant/PhotoService";

const usePhoto = (id?: number | string) => {
  const { data, isSuccess } = useQuery({
    queryKey: [`photo ${id}`],
    queryFn: async () => (!!id ? await PhotoService.getById(id) : null),
  });

  return { data, isSuccess };
};

export default usePhoto;
