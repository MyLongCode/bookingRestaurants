"use client";

import React from "react";
import Button from "@/components/shared/controls/button/Button";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import RegisterModal from "@/components/auth/registerModal/RegisterModal";

const HomeModalButtons = () => {
  return (
    <>
      <Button
        btnType={"link"}
        font={"default"}
        style={"outlined"}
        href={"?state=login"}
      >
        Войти
      </Button>
      <Button
        btnType={"link"}
        font={"default"}
        style={"flat"}
        href={"?state=register"}
      >
        Зарегистрироваться
      </Button>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default HomeModalButtons;
