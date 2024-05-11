import { Review } from "@/models/restaurant/review.type";
import Image from "next/image";
import Rating from "@/components/shared/raiting/Rating";
import styles from "./restaurantReview.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { declOfNum } from "@/lib/helpers/declination";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type RestaurantReviewProps = Review & { editable?: boolean };

const RestaurantReview = async ({
  id,
  rating,
  text,
  time,
  user_name,
  editable,
  images,
  user_reviews,
  user,
}: RestaurantReviewProps) => {
  const date = new Date(time);
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <div className={styles.userAvatarWrapper}>
          {/*<Image src={""} alt={""} fill className={styles.userAvatar} />*/}
        </div>
        <p className={styles.userName}>{user_name}</p>
        <p className={styles.userReviewsCount}>
          {user_reviews}{" "}
          {declOfNum(user_reviews, ["отзыв", "отзыва", "отзывов"])}
        </p>
      </div>
      <div className={styles.review}>
        <div className={styles.reviewInfo}>
          <p className={styles.date}>
            {date.toLocaleDateString()} в{" "}
            {date.toLocaleTimeString().slice(0, 5)}
          </p>
          <Rating value={rating} />
        </div>
        <p className={styles.message}>{text}</p>
        <ul>
          {images &&
            images.map((image) => {
              return (
                <li className={styles.imageContainer} key={image}>
                  <Image src={image} alt={""} fill />
                </li>
              );
            })}
        </ul>
      </div>
      {(editable || session?.user?.id === user.toString()) && (
        <Button
          btnType={"link"}
          btnStyle={"icon"}
          padding={"no"}
          iconSrc={"/icons/Delete.svg"}
          className={styles.removeBtn}
          href={`?state=delete&type=review&deleteId=${id}`}
        />
      )}
    </div>
  );
};

export default RestaurantReview;
