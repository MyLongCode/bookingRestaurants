"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import styles from "./headerNavLink.module.scss";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

type HeaderNavLinkProps = React.ComponentProps<typeof Link> & {
  text: string;
  additionalActive?: string;
  disabled?: boolean;
};

const HeaderNavLink = ({
  text,
  href,
  additionalActive,
  disabled,
  ...props
}: HeaderNavLinkProps) => {
  const route = usePathname();

  const isActive = useMemo(
    () =>
      route === href ||
      (additionalActive && route.startsWith(additionalActive)),
    [route, href, additionalActive],
  );

  return (
    <li className={styles.wrapper}>
      <Link
        className={clsx(
          styles.link,
          isActive && styles.active,
          disabled && styles.disabled,
        )}
        href={isActive ? "#" : href}
        {...props}
      >
        {text}
      </Link>
    </li>
  );
};

export default HeaderNavLink;
