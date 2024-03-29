import React from "react";
import Modal from "@/components/shared/modal/Modal";
import RegisterForm from "@/components/auth/registerModal/components/registerForm/RegisterForm";

type RegisterModalProps = {};

const RegisterModal = (props: RegisterModalProps) => {
  return (
    <Modal state={"register"}>
      <Modal.Window>
        <Modal.Title>Регистрация</Modal.Title>
        <RegisterForm />
      </Modal.Window>
    </Modal>
  );
};

export default RegisterModal;
