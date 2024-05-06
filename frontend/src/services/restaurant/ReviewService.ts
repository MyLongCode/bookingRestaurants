import fetch from "@/lib/fetch";
import { Review } from "@/models/restaurant/review.type";
import axios from "@/lib/axios";
import { ReviewDto } from "@/models/restaurant/reviewDto.type";
import {revalidateRestaurant, revalidateRestaurantReviews} from "@/lib/actions";

export default class ReviewService {
  public static async getAll(id: string | number): Promise<Review[]> {
    return await fetch.get(
      `/restaurant/${id}/reviews/`,
      `restaurant ${id} reviews`,
    );
  }

  public static async create(id: string | number, data: ReviewDto) {
    return await axios
      .post(`/restaurant/${id}/reviews/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        revalidateRestaurantReviews(id);
        revalidateRestaurant();
        return res.data;
      });
  }
}
