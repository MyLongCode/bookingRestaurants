import Image from "next/image";
import styles from "./page.module.scss";
import HomeModalButtons from "@/components/screens/home/modalButtons/HomeModalButtons";

export default function HomePage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.textContainer}>
          <h1>
            Хочешь вкусно
            <br /> покушать?
          </h1>
          <p className={styles.subtitle}>
            Найди заведение и забронируй в нем столик!
          </p>
        </div>
        <div className={styles.btns}>
          <HomeModalButtons />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src={"/HomePageRamen.png"}
          alt={"Рамен"}
          fill
          sizes={"1"}
          priority
        />
      </div>
    </main>
  );
}
