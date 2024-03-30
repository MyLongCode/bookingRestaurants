import { CSSProperties } from "react";
import { clsx } from "clsx";
import styles from "./navArrow.module.scss";

type NavArrowProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  isLeft?: boolean
};

const NavArrow = ({ onClick, className, style, isLeft }: NavArrowProps) => {
  return (
    <div
      className={clsx(className, styles.wrapper, isLeft && styles.left)}
      style={style}
      onClick={onClick}
    />
  );
};

export default NavArrow;
