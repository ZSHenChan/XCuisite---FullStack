"use client";

import styles from "./paymentButton.module.scss";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import ButtonPrimaryOutline from "@/components/Buttons/ButtonPrimaryOutLine";
import { motion, AnimatePresence } from "framer-motion";
import { env } from "@/data/env/client";

export function PaymentButton({ enabled }) {
  return (
    <motion.form
      action={`${env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`}
      method="POST"
      className={styles.paymentButtonForm}
      key="paymentButton"
      animate={{
        opacity: enabled ? 100 : 0,
        y: enabled ? 0 : 20,
      }}
      initial={{ y: 20, opacity: 0 }}
      transition={{ delay: 0.5 }}
    >
      <ButtonPrimaryOutline
        type="submit"
        // role="link"
        className={styles.paymentButton}
      >
        Proceed to Payment
      </ButtonPrimaryOutline>
    </motion.form>
  );
}
