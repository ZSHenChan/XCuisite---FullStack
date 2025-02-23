"use client";

import styles from "./success.module.scss";

import Image from "next/image";

import Link from "next/link";
import ButtonPrimaryOutline from "@/components/Buttons/ButtonPrimaryOutLine";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";

export default function SuccessCard() {
  //   const router = useRouter();

  return (
    <div className={styles["success-card"]}>
      <Image
        src="/images/checkOut/orange-tick.jpg"
        width={200}
        height={200}
        alt="orange tick"
      ></Image>
      <h4 className={styles["success-card-heading"]}>
        Thank you for ordering!
      </h4>
      <p className={styles["success-card-text"]}>
        Please check your email for the order confirmation and details.
      </p>
      <div className={styles["success-card-buttons"]}>
        <ButtonPrimaryOutline>
          <Link href="/offers">View Order</Link>
        </ButtonPrimaryOutline>

        <ButtonSecondary>
          <Link href="/offers">Continue Shopping</Link>
        </ButtonSecondary>
      </div>
    </div>
  );
}
