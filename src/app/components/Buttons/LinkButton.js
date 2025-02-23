"use client";

import ButtonPrimary from "./ButtonPrimary";
import styles from "./Button.module.scss";

export default function LinkButton({ children, link, className }) {
  const router = useRouter();
  return (
    <ButtonPrimary className={className}>
      <a
        onClick={() => router.push(link)}
        className={` ${styles["btn-link"]} `}
      >
        {children}
      </a>
    </ButtonPrimary>
  );
}
{
  /* <a
            className={`${styles["check-out-btn"]} btn btn-primary`}
            href="./html/checkOut.html"
          >
            Check Out <span className={styles["check-out-arrow"]}>&rarr;</span>
          </a> */
}
