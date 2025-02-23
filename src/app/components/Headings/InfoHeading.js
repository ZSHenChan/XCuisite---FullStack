import styles from "./Heading.module.scss";

export default function InfoHeading({ children, className }) {
  return <h4 className={` ${styles["h-info"]} ${className}`}>{children}</h4>;
}
