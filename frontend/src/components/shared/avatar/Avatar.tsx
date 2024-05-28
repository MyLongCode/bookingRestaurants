"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./avatar.module.scss";
import { signOut } from "next-auth/react";

const Avatar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [ref]);

  return (
    <div onClick={() => setIsMenuVisible(true)} className={styles.wrapper}>
      <Image
        className={styles.img}
        src="/DefaultUserAvatar.svg"
        alt="Аватар пользователя"
        fill
      />
      {isMenuVisible && (
        <div className={styles.menu} ref={ref}>
          <a href="/profile">Профиль</a>
          <button onClick={() => signOut()}>Выход</button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
