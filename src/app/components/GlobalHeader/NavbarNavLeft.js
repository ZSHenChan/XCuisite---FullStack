"use client";
import styles from "./GlobalHeader.module.scss";

import { NAV_LINKS } from "./NAV_LINKS";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";

export default function NavbarNavLeft() {
  return (
    <ul
      className={`${styles["navbar-nav"]} navbar-nav ${styles["navbar-nav--left"]}`}
    >
      <Logo />
      {NAV_LINKS.map((link) => (
        <li className={`${styles["navbar-item"]}`} key={link.href}>
          <Link
            href={link.href}
            className={`nav-link ${styles["nav-link"]}`}
            tabIndex="0"
            aria-label={link.ariaLabel}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
