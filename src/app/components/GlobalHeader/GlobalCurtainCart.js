"use client";

import ButtonPrimary from "../Buttons/ButtonPrimary";
// import LinkButton from "@/components/Buttons/LinkButton";
import { InfoHeading } from "../Feedback/FeedbackHeading";

import styles from "./GlobalCurtain.module.scss";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function GlobalCurtainCart({ closeCurtain }) {
  const { getCart, emptyCart } = useContext(CartContext);
  const cartItems = getCart().items;
  const router = useRouter();

  const handleEmptyCart = () => {
    emptyCart();
    closeCurtain();
  };

  const handleCheckoutBtn = () => {
    router.push("/bag");
    closeCurtain();
  };

  return (
    <div className={styles["global-curtain-content"]}>
      <span className={styles["in-cart-header"]}>
        <h3 className={styles["cart-header"]}>Your Items</h3>
        <ButtonPrimary
          onClick={handleEmptyCart}
          className={`${styles["curtain-btn"]}`}
        >
          Empty Cart
        </ButtonPrimary>
      </span>
      {cartItems.length === 0 && (
        <InfoHeading>
          You have no items in the cart. Bake some doughnuts!
        </InfoHeading>
      )}

      <ul className={styles["in-cart-item-wrapper"]} role="list">
        {cartItems.slice(0, 3).map((item) => (
          <li className={styles["in-cart-item"]} role="listitem" key={item.id}>
            <div className={styles["item-img-container"]}>
              <img
                src={item.thumbnail}
                alt={item.imgAlt}
                className={styles["item-img rounded top-5"]}
                width="64"
                height="64"
              />
            </div>
            <div className={styles["item-name"]}>
              <p className={styles["item-name-product"]}>{item.productName}</p>
              <p className={styles["item-name-quantity"]}>x{item.quantity}</p>
            </div>
          </li>
        ))}
        {cartItems.length > 3 ? (
          <p className={styles["more-item"]}>and {cartItems.length - 3} more</p>
        ) : (
          ""
        )}
      </ul>
      <ButtonPrimary
        onClick={handleCheckoutBtn}
        className={`${styles["curtain-btn"]} ${styles["btn-checkout"]}`}
      >
        Review Bag&nbsp;
        <span className={styles["check-out-arrow"]}>&rarr;</span>
      </ButtonPrimary>
    </div>
  );
}
