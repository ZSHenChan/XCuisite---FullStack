"use client";

import Button from "./Button";

import styles from "./Button.module.scss";

export default function ButtonPrimaryOutline({ children, onClick, className }) {
  return (
    <Button
      onClick={onClick}
      className={` ${styles["btn-primary-outline"]} ${className}`}
    >
      {children}
    </Button>
  );
}
