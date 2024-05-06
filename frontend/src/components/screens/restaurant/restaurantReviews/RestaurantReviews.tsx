import { Review } from "@/models/restaurant/review.type";
import RestaurantReview from "@/restaurant/restaurantReview/RestaurantReview";
import styles from "./restaurantReviews.module.scss";
import RestaurantNewReview from "@/restaurant/restaurantNewReview/RestaurantNewReview";

type RestaurantReviewsProps = {
  reviews: Review[];
  restaurantId: string;
  editable?: boolean;
};

const RestaurantReviews = ({
  reviews,
  restaurantId,
  editable,
}: RestaurantReviewsProps) => {
  return (
    <>
      <h3 className={styles.title}>Отзывы</h3>
      <ul className={styles.list}>
        {reviews?.map((review) => {
          return (
            <li key={review.id}>
              <RestaurantReview
                id={review.id}
                user_name={review.user_name}
                text={review.text}
                time={review.time}
                user_reviews={review.user_reviews}
                rating={review.rating}
                restaurant={review.restaurant}
                images={review.images}
                editable={editable}
              />
            </li>
          );
        })}
      </ul>
      <RestaurantNewReview restaurantId={restaurantId} />
    </>
  );
};

export default RestaurantReviews;
