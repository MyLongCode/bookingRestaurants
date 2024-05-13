"use client";
import Button from "@/components/shared/controls/button/Button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      btnType={"button"}
      btnStyle={"outlined"}
      font={"comfortaa"}
      fontSize={"small"}
      onClick={() => signOut()}
    >
      Выйти из аккаунта
    </Button>
  );
};

export default LogoutButton;
