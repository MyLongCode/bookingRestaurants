import Image from "next/image";
import styles from "./page.module.scss";
import Button from "@/components/shared/button/Button";

export default function Home() {
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
          <Button font={"comfortaa"} style={"outlined"}>
            Войти
          </Button>
          <Button font={"default"} style={"flat"}>
            Зарегистрироваться
          </Button>
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
