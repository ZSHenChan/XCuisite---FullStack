import styles from "./not-found.module.scss";
import Link from "next/link";
import Banner from "@/components/Banners/Banner";

export default function NotFound() {
  return (
    <>
      <Banner imgSrc="offers" alt="Offers Banner" />
      <div className={styles["not-found-div"]}>
        <div className={styles["wrapper"]}>
          <h2 className={styles["heading"]}>
            Oops... Seems that this page is currently down.
          </h2>
          <p className={styles["sub-heading"]}>
            Call 123-456-789 for customer service
          </p>
          <span>Or&nbsp;&nbsp;</span>
          <Link href="/" className={styles["return-link"]}>
            Return to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
