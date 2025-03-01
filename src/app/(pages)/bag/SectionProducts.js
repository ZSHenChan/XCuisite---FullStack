"use client";

import styles from "./bag.module.scss";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { getCurrency } from "@/utils/currency";

export default function SectionProducts({ className }) {
  const { getCartItems, getCartQuantity } = useContext(CartContext);
  const cartItems = getCartItems();
  const CURRENCY = getCurrency();

  return (
    getCartQuantity() != 0 && (
      <section
        className={`${styles["section-products"]} ${className}`}
        initial={{ scale: 0.5 }}
      >
        <ul className={styles.items}>
          {cartItems.map((item) => {
            return (
              <li className={styles.item} key={item.id}>
                <div className={styles["item-img-container"]}>
                  <img
                    src={item.thumbnail}
                    alt={item.imgAlt}
                    className={` ${styles["item-img"]} rounded top-5`}
                    width="64"
                    height="64"
                  />
                </div>
                <div className={styles["item-name"]}>
                  <p className={styles["item-name-product"]}>
                    {item.productName}
                  </p>
                  <p className={styles["item-name-quantity"]}>
                    x{item.quantity}
                  </p>
                </div>
                <div className={styles["item-price"]}>
                  {CURRENCY}&nbsp;
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    )
  );
}
