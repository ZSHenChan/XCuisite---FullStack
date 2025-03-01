"use client";

import styles from "./checkout.module.scss";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";

export function EmbeddedCheckoutButton() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const modalRef = useRef(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1Qvde44CcIdSwh5u0fcvcdao",
        }),
      });

      const responseBody = (await res).json();
      setClientSecret(responseBody.clientSecret);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(true);
    modalRef.current?.close();
  };

  return (
    <>
      <form>
        <section>
          <button onClick={handleCheckoutClick}>Checkout</button>
        </section>
      </form>
      <dialog ref={modalRef} className={styles.dialog}>
        {showCheckout && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </dialog>
    </>
  );
}
