import styles from "./Heading.module.scss";

export default function SubheadingPage({ children, className }) {
  return <h1 className={` ${styles["h-2"]} ${className}`}>{children}</h1>;
}
