import styles from "./GlobalFooter.module.scss";

export default function FooterColumn({ children }) {
  return <div className={styles["footer-column"]}>{children}</div>;
}
