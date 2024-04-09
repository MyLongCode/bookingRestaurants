import { axiosAuth } from "@/lib/axios";
import { revalidatePhotos } from "@/lib/actions";
import { Photo } from "@/models/restaurant/photo.type";

export default class PhotoService {
  public static async delete(id: string | number) {
    return await axiosAuth.delete(`/photo/${id}/`).then(async (res) => {
      await revalidatePhotos();
      return res.data;
    });
  }

  public static async getById(id: string | number): Promise<Photo> {
    return await axiosAuth.get<Photo>(`/photo/${id}/`).then(async (res) => {
      return res.data;
    });
  }

  public static async patch(
    id: string | number,
    data: Partial<Photo>,
  ): Promise<Photo> {
    return await axiosAuth
      .patch<Photo>(`/photo/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        await revalidatePhotos();
        return res.data;
      });
  }
}
