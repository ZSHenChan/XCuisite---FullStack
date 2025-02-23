"use client";

import styles from "./login.module.scss";

import { getCurrency } from "@/utils/currency";

export default function LoginBenefits({ totalAmount }) {
  const CURRENCY = getCurrency();
  return (
    <div className={styles["login-benefits"]}>
      <h3>Checkout with your account</h3>
      <p>Earn 10 points per {CURRENCY} spent.</p>
    </div>
  );
}
