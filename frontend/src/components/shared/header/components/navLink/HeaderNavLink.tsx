"use client";

import Link from "next/link";
import React from "react";
import styles from "./headerNavLink.module.scss";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

type HeaderNavLinkProps = React.ComponentProps<typeof Link> & {
  text: string;
  additionalActive?: string;
};

const HeaderNavLink = ({
  text,
  href,
  additionalActive,
  ...props
}: HeaderNavLinkProps) => {
  const route = usePathname();
  return (
    <li className={styles.wrapper}>
      <Link
        className={clsx(
          styles.link,
          (route === href ||
            (additionalActive && route.startsWith(additionalActive))) &&
            styles.active,
        )}
        href={href}
        {...props}
      >
        {text}
      </Link>
    </li>
  );
};

export default HeaderNavLink;
