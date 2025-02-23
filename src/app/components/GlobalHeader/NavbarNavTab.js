"use client";
import styles from "./GlobalHeader.module.scss";

import { motion, useDimensions } from "framer-motion";
import { NAV_LINKS } from "./NAV_LINKS";
import Link from "next/link";

export default function NavbarNavTab({ isOpen }) {
  return (
    <motion.div animate={isOpen ? "open" : "closed"} initial="closed">
      <motion.ul
        className={`navbar-nav ${styles["navbar-nav-tab"]} `}
        variants={navVariants}
      >
        {NAV_LINKS.map((link) => MenuItem(link))}
      </motion.ul>
    </motion.div>
  );
}

const navVariants = {
  open: {
    height: "100dvh",
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    duration: 0.5,
    ease: "easeOut",
    height: "0",
    transition: { delay: 0.3, staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = (link) => {
  return (
    <motion.li
      className={`${styles["navbar-item"]}`}
      key={link.href}
      variants={itemVariants}
    >
      <Link
        href={link.href}
        className={`nav-link ${styles["nav-link"]}`}
        tabIndex="0"
        aria-label={link.ariaLabel}
      >
        {link.text}
      </Link>
    </motion.li>
  );
};
