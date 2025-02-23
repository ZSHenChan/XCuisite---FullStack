import styles from "./bag.module.scss";

export default function WeAccept() {
  return (
    <div className={styles["we-accept"]}>
      <p className={styles["we-accept__heading"]}>we accept:</p>
      <div className={styles["we-accept__logos"]}>
        <figure className={styles["we-accept__img__container"]}>
          <img
            src="/images/checkOut/applepay.png"
            alt="apple pay"
            className={styles["we-accept__img"]}
          />
        </figure>
        <figure className={styles["we-accept__img__container"]}>
          <img
            src="/images/checkOut/grabpay.png"
            alt="grab pay"
            className={styles["we-accept__img"]}
          />
        </figure>
        <figure className={styles["we-accept__img__container"]}>
          <img
            src="/images/checkOut/googlepay.png"
            alt="google pay"
            className={styles["we-accept__img"]}
          />
        </figure>
      </div>
    </div>
  );
}
