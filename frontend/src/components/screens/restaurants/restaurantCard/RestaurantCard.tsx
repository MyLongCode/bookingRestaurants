import Image from "next/image";
import styles from "./restaurantCard.module.scss";
import Link from "next/link";

type RestaurantCardProps = {
  title: string;
  logo: string;
  id: string | number;
};

const RestaurantCard = ({ logo, title, id }: RestaurantCardProps) => {
  return (
    <Link href={`/restaurants/restaurant/${id}`} className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt={""} fill sizes={"1"} />
      </div>
      <p className={styles.title}>{title}</p>
    </Link>
  );
};

export default RestaurantCard;
