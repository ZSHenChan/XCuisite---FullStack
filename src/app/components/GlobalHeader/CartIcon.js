import styles from "./CartIcon.module.scss";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function CartIcon({ onClick }) {
  const { getCartQuantity } = useContext(CartContext);
  const cartQty = getCartQuantity();

  return (
    <>
      <div
        id="cart-icon"
        className={`${styles["cart-icon"]} nav-link`}
        onClick={onClick}
      >
        <svg
          className={`${styles["icon"]} navbar-item `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path d="M27.2 9h-4.58.07A3.53 3.53 0 0 0 25 6.18a3.56 3.56 0 0 0-6.62-2.36L16 8l-2.33-4.18a3.57 3.57 0 0 0-6.62 2.36A3.53 3.53 0 0 0 9.31 9h.07H4.8A1.81 1.81 0 0 0 3 10.8v2.4A1.81 1.81 0 0 0 4.8 15H5v12.05A3 3 0 0 0 8 30h16.1a3 3 0 0 0 2.9-2.95V15h.2a1.81 1.81 0 0 0 1.8-1.8v-2.4A1.81 1.81 0 0 0 27.2 9zm-7.12-4.2a1.56 1.56 0 0 1 1.07-.8 1.43 1.43 0 0 1 .29 0 1.52 1.52 0 0 1 1 .35A1.6 1.6 0 0 1 23 5.86a1.56 1.56 0 0 1-1 1.24l-4.09 1.55zM9 5.86a1.6 1.6 0 0 1 .57-1.51 1.54 1.54 0 0 1 1-.35 1.43 1.43 0 0 1 .29 0 1.56 1.56 0 0 1 1.07.77l2.17 3.85L10 7.1a1.56 1.56 0 0 1-1-1.24zM5 11h8v2H5zm10 17V18a1 1 0 0 0-2 0v10H8a.94.94 0 0 1-1-.95V15h7a1 1 0 0 0 1-1v-3h2v17zm12-15h-5a1 1 0 0 0 0 2h3v12.05a.94.94 0 0 1-.95.95H19V11h8z" />
        </svg>
        <span id="cart-qty" className={`${styles["cart-qty"]} navbar-item`}>
          {cartQty}
        </span>
      </div>
    </>
  );
}
