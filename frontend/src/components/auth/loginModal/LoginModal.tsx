import React from "react";
import Modal from "@/components/shared/modal/Modal";
import LoginForm from "@/components/auth/loginModal/components/loginForm/LoginForm";

type LoginModalProps = {};

const LoginModal = (props: LoginModalProps) => {
  return (
    <Modal state={"login"}>
      <Modal.Window>
        <Modal.Title>Вход в аккаунт</Modal.Title>
        <LoginForm />
      </Modal.Window>
    </Modal>
  );
};

export default LoginModal;
