import React from "react";
import FooterSocials from "@/components/shared/footer/components/footerSocials/FooterSocials";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.copyright}>© BistroScout, 2024г.</p>
      <FooterSocials>
        <FooterSocials.Item iconSrc={"/icons/Telegram.svg"} />
        <FooterSocials.Item iconSrc={"/icons/Instagram.svg"} />
        <FooterSocials.Item iconSrc={"/icons/VK.svg"} />
      </FooterSocials>
    </footer>
  );
};

export default Footer;
