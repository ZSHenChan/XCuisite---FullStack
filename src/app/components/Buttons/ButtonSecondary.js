"use client";

import Button from "./Button";

import styles from "./Button.module.scss";

export default function ButtonSecondary({
  children,
  onClick,
  className,
  ...props
}) {
  return (
    <Button
      onClick={onClick}
      className={`${styles["btn-secondary"]} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
