"use client";

import React from "react";
import Button from "@/components/shared/controls/button/Button";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import RegisterModal from "@/components/auth/registerModal/RegisterModal";
import styles from "./homeModalButtons.module.scss";

const HomeModalButtons = () => {
  return (
    <>
      <Button
        btnType={"link"}
        font={"default"}
        style={"outlined"}
        href={"?state=login"}
        className={styles.button}
      >
        Войти
      </Button>
      <Button
        btnType={"link"}
        font={"default"}
        style={"flat"}
        href={"?state=register"}
        scroll={false}
      >
        Зарегистрироваться
      </Button>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default HomeModalButtons;
