import styles from "./login.module.scss";

import Banner from "@/components/Banners/Banner";
import SectionForgetLogin from "./SectionForgetLogin";

export default function CheckoutLogin() {
  return (
    <div>
      <h1 className={styles["heading"]}>Did you forget to sign in?</h1>
      <SectionForgetLogin />
    </div>
  );
}
