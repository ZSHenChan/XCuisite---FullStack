"use client";

import styles from "./bag.module.scss";

import ButtonSecondary from "@/components/Buttons/ButtonSecondary";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { getCurrency } from "@/utils/currency";

import { SHIPPING_AMOUNT, MIN_NO_SHIP_FEE } from "@/lib/constants";

export default function SectionSummary({
  className,
  showCheckoutButton = true,
}) {
  const {
    getSubtotalAmount,
    getTotalAmount,
    getCartQuantity,
    getTotalDiscountAmount,
    getShippingAmount,
  } = useContext(CartContext);
  const CURRENCY = getCurrency();
  const router = useRouter();

  return (
    getCartQuantity() != 0 && (
      <section className={` ${styles["section-summary"]} ${className}`}>
        <div className={`mb-lg ${styles.summary}`}>
          <p className={`m-0 ${styles.summary__heading}`}>Subtotal</p>
          <div className={styles["total-checkout__amount"]}>
            <span className={styles.total_amount}>
              {CURRENCY}&nbsp;
              {getSubtotalAmount()}
            </span>
          </div>
          <p className={`mb-0 ${styles.summary__heading}`}>Shipping</p>
          <div className={` mb-sm ${styles["total-checkout__shipping"]}`}>
            <span className={styles.shipping_amount}>
              {CURRENCY}&nbsp;
              {getShippingAmount().toFixed(2)}
            </span>
          </div>
          <p className={`mb-0 ${styles.summary__heading}`}>Discount</p>
          <div className={styles["total-checkout__amount"]}>
            <span className={styles.total_amount}>
              {CURRENCY}&nbsp;
              {getTotalDiscountAmount().toFixed(2)}
            </span>
          </div>
          <p
            className={`${styles.summary__heading} m-0 ${styles["total-checkout__grand"]}`}
          >
            Grand Total
          </p>
          <div className={styles["grand-total"]}>
            <span className={styles["grand-total__amount"]}>
              {CURRENCY}&nbsp;
              {getTotalAmount().toFixed(2)}
            </span>
          </div>
        </div>
        {showCheckoutButton && (
          <ButtonSecondary
            onClick={() => router.push("./checkout")}
            className={`${styles["btn-checkout-payment"]}`}
          >
            Check Out
          </ButtonSecondary>
        )}
      </section>
    )
  );
}
