"use client";

import Button from "./Button";

import styles from "./Button.module.scss";

export default function ButtonPrimary({ children, onClick, className }) {
  return (
    <Button
      onClick={onClick}
      className={` ${styles["btn-primary"]} ${className}`}
    >
      {children}
    </Button>
  );
}
