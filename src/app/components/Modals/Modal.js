"use client";

import "@/styles/custom-bootstrap.scss";
import styles from "./Modal.module.scss";
import ButtonSecondary from "../Buttons/ButtonSecondary";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

export default function Modal({ hidden, onHideModal }) {
  const { cartContext, addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const modalProduct = cartContext.modalProduct;

  const handleAddToCart = () => {
    onHideModal();
    addToCart(modalProduct, quantity);
    setQuantity(1);
  };

  const handleInputChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  return (
    <div
      className={`${styles["modal"]} ${hidden ? styles["modal-hidden"] : ""}`}
    >
      <div className={styles["modal-overlay"]} onClick={onHideModal}></div>
      <div className={styles["card-wrapper"]}>
        <div
          className={`card ${styles["card"]} ${styles["card-face"]} ${styles["card-face--front"]}`}
        >
          <img
            src={modalProduct.img}
            alt="Product Image"
            className={`card-image-top rounded-top-5 ${styles["card-image-top"]}`}
          />
          <div
            className={` card-body ${styles["card-body"]} justify-content-center `}
          >
            <h4
              className={`modal-item-name card-title ${styles["modal-item-name"]}`}
            >
              {modalProduct.productName}
            </h4>
            <input
              type="number"
              className={styles["modal-item-qty"]}
              min="1"
              name="qty"
              value={quantity}
              onChange={handleInputChange}
            />
            <ButtonSecondary
              className={styles["modal-btn"]}
              onClick={handleAddToCart}
            >
              Add to cart
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
}
