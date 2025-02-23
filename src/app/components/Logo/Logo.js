import styles from "./Logo.module.scss";
import Link from "next/link";

export default function Logo({ absolute = false }) {
  return (
    <Link
      href="/"
      className={` ${styles.menuback} ${absolute && styles.absolute}`}
    >
      <img
        src="images/logos/xcuisite-logo-64.png"
        alt="xcuisite logo"
        className={styles["menuback__logo"]}
      />
    </Link>
  );
}
