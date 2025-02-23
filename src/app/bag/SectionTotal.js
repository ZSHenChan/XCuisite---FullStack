"use client";

import styles from "./bag.module.scss";

// import CheckoutBtn from "./CheckoutBtn";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { InfoHeading } from "@/components/Feedback/FeedbackHeading";
import { SpinnerOrange } from "@/components/Feedback/Spinner";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { getCurrency } from "@/utils/currency";

import { MIN_NO_SHIP_FEE } from "@/lib/constants";

export default function SectionTotal() {
  const { getTotalAmount, getCartQuantity } = useContext(CartContext);
  const CURRENCY = getCurrency();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay to check the cart quantity
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpinnerOrange size="200px" />;
  }

  return getCartQuantity() == 0 ? (
    <InfoHeading>No items in cart</InfoHeading>
  ) : (
    <section className={styles["section-total"]}>
      <h1 className={`${styles["section-total__heading"]}`}>
        Your order total is&nbsp;
        <span
          className={`section-total__total ${styles["grand-total__amount"]}`}
        >
          {CURRENCY}&nbsp;{parseFloat(getTotalAmount().toFixed(2))}
        </span>
      </h1>
      <div className={` ${styles["section-total__shipping"]}`}>
        Free delivery for orders over {CURRENCY}
        {MIN_NO_SHIP_FEE}
      </div>
      <ButtonSecondary
        onClick={() => router.push("/checkout")}
        className={`${styles["btn-checkout-payment"]} ${styles.btnCheckoutPayment}`}
      >
        Check Out
      </ButtonSecondary>
    </section>
  );
}
