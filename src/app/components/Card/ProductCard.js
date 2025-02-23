"use client";

import "@/styles/custom-bootstrap.scss";
import utilities from "@/styles/utilities.scss";
import styles from "./ProductCard.module.scss";

import ButtonSecondary from "../Buttons/ButtonSecondary";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "@/context/CartContext";

export default function ProductCard({
  children,
  product,
  onHideModal,
  onShowModal,
  isSelected,
  ...props
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { updateModalProduct } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleShowModal = () => {
    updateModalProduct(product);
    onShowModal();
  };

  if (!isClient) return null;

  return (
    <div
      className={`${styles["card-wrapper"]} reveal`}
      data-id={product.id}
      {...props}
    >
      <motion.div
        className={`card ${styles["card"]} ${styles["card-face"]} ${
          styles["card-face--front"]
        } ${isFlipped ? styles["card-face--front--flipped"] : ""}`}
        layoutId={`overlay-animation-${product.id}`}
      >
        <motion.img
          src={product.img}
          alt={product.imgAlt}
          className={`${styles["card-image-top"]}`}
          onClick={handleFlip}
        />
        <div className={styles["card-body"]}>
          <div>
            <p className={`${utilities.mb1} ${styles["card-title"]}`}>
              {product.productName}
            </p>
            <p className={`${utilities.mb1} ${styles["card-text"]}`}>
              {product.description}
            </p>
            <p className={utilities.mb3}>
              <strong className={`${styles["card-price"]}`}>
                ${product.price}
              </strong>
            </p>
          </div>
          <div className={`${styles["cta-links"]}`}>
            <a className={`${styles["icon-link"]}`} onClick={handleFlip}>
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
              onClick={handleShowModal}
            >
              Bake
            </ButtonSecondary>
          </div>
        </div>
      </motion.div>
      <div
        className={`card ${styles["card"]} ${styles["card-face"]} ${
          styles["card-face--back"]
        }  ${isFlipped ? styles["card-face--back--flipped"] : ""}`}
      >
        <motion.img
          src={product.img}
          alt={product.imgAlt}
          className={`${styles["card-image-top"]} ${styles["card-image-top--back"]}`}
          onClick={handleFlip}
        />
        <div className={styles["card-body"]}>
          <div>
            <p className={`${styles["card-title"]}`}>{product.productName}</p>
            <p className={`${styles["card-text"]}`}>{product.ingredients}</p>
          </div>
          <div className={`${styles["cta-links"]}`}>
            <a className={`${styles["icon-link"]}`} onClick={handleFlip}>
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
              <span>Back</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
