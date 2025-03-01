import styles from "./login.module.scss";

export default function ContinueGuest() {
  return (
    <div className={styles["continue-guest"]}>
      <h3>Continue without Login</h3>
      <p>Checkout without signing in</p>
    </div>
  );
}
