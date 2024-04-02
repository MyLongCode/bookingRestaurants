import React, { ReactNode } from "react";
import Button from "@/components/shared/controls/button/Button";
import styles from "./footerSocials.module.scss";

type FooterSocialsProps = {
  children?: ReactNode;
};

const FooterSocials = ({ children }: FooterSocialsProps) => {
  return <ul className={styles.wrapper}>{children}</ul>;
};

type FooterSocialsItemProps = {
  iconSrc: string;
};

const Item = ({ iconSrc }: FooterSocialsItemProps) => {
  return (
    <li className={styles.item}>
      <Button className={styles.itemBtn} btnType={"link"} style={"flat"} iconSrc={iconSrc} />
    </li>
  );
};

FooterSocials.Item = Item;

export default FooterSocials;
