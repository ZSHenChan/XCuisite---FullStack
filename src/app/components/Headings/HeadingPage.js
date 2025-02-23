import styles from "./Heading.module.scss";

export default function HeadingPage({ children, className }) {
  return <h1 className={` ${styles["h-1"]} ${className}`}>{children}</h1>;
}
