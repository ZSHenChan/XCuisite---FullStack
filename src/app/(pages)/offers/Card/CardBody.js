"use client";

import styles from "./Card.module.scss";

import { openSpring, closeSpring } from "./animations";
import { useMotionValue, motion } from "framer-motion";
import { useTransform } from "framer-motion";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { getCurrency } from "@/utils/currency";

import ButtonSecondary from "@/components/Buttons/ButtonSecondary";

export function CardBody({ isSelected, product, onHideModal }) {
  const motionVal = useMotionValue(1);
  const inverted = useTransform(motionVal, (s) => 1 / s);
  const x = 0;
  const y = isSelected ? -20 : 0;

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    setQuantity(1);
    onHideModal();
  };

  const handleInputChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  if (!isSelected) return <></>;

  return (
    <motion.div
      className={styles["card-body"]}
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <div>
        <h4 className={` ${styles["card-title"]}`}>{product.productName}</h4>
        <p className={` ${styles["card-text"]}`}>{product.description}</p>
        <p>
          <strong className={`${styles["card-price"]}`}>
            {getCurrency()}&nbsp;
            {product.price}
          </strong>
        </p>
      </div>
      <div className={styles["card-right"]}>
        <input
          type="number"
          className={styles["card-input"]}
          min="1"
          name="qty"
          value={quantity}
          onChange={handleInputChange}
        />
        <ButtonSecondary
          className={styles["card-btn"]}
          onClick={handleAddToCart}
        >
          Bake
        </ButtonSecondary>
      </div>
      {/* <div className={`${styles["cta-links"]}`}>
        <a className={`${styles["icon-link"]}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-symmetry-horizontal ${styles["card-icon"]}`}
            viewBox="0 0 16 16"
          >
            <path d="M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376M11.539 10H3v4.658L11.54 10z" />
          </svg>
          Ingredients
        </a>
        <ButtonSecondary
          className={`${styles["card-btn"]}`}
          //   onClick={handleShowModal}
        >
          Bake
        </ButtonSecondary>
      </div> */}
    </motion.div>
  );
}
