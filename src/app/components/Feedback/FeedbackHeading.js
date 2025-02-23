import styles from "./feedbackHeading.module.scss";

export function InfoHeading({ children, className }) {
  return <h4 className={` ${styles["h-info"]} ${className}`}>{children}</h4>;
}

export function ErrorHeading({ children, className }) {
  return <h4 className={` ${styles["h-error"]} ${className}`}>{children}</h4>;
}
