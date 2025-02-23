"use client";

import styles from "./Button.module.scss";

export default function Button({ children, onClick, ...props }) {
  return (
    <button className={styles.btn} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
