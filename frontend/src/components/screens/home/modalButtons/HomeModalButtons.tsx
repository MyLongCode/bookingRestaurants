"use client";

import React, { useState } from "react";
import Button from "@/components/shared/button/Button";
import LoginModal from "@/components/auth/loginModal/LoginModal";

const HomeModalButtons = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleLoginModalClose = () => {
    setIsLoginVisible(false);
  };

  return (
    <>
      <Button
        font={"comfortaa"}
        style={"outlined"}
        onClick={() => {
          setIsLoginVisible(true);
        }}
      >
        Войти
      </Button>
      <Button font={"default"} style={"flat"}>
        Зарегистрироваться
      </Button>
      {isLoginVisible && <LoginModal onClose={handleLoginModalClose} />}
    </>
  );
};

export default HomeModalButtons;
