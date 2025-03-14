"use client";

import styles from "./Card.module.scss";

import { useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
import { CartContext } from "@/context/CartContext";
import { Image } from "./Image";
import { CardBody } from "./CardBody";

import { useInvertedBorderRadius } from "@/utils/use-inverted-border-radius";

export function Card({
  children,
  product,
  updateModalProduct,
  onHideModal,
  onShowModal,
  isSelected,
}) {
  const y = useMotionValue(0);
  const zIndex = useMotionValue(isSelected ? 2 : 0);

  const inverted = useInvertedBorderRadius(20);

  const handleShowModal = () => {
    if (!isSelected) {
      updateModalProduct(product);
      onShowModal();
    }
  };

  const handleHideModal = () => {
    onHideModal();
  };

  return (
    <div className={`${styles["card"]}`}>
      <div
        className={`${styles["card-content-container"]} ${
          isSelected && styles.open
        }`}
      >
        <motion.div
          className={styles["card-content"]}
          style={{ ...inverted, zIndex, y }}
          layoutId={`product-card-container-${product.id}`}
          onClick={handleShowModal}
        >
          <Image
            id={product.id}
            alt={product.imgAlt}
            isSelected={isSelected}
            onClick={onHideModal}
          ></Image>
          <CardBody
            isSelected={isSelected}
            product={product}
            onHideModal={handleHideModal}
          />
        </motion.div>
      </div>
    </div>
  );
}

// const Overlay = ({ isSelected }) => (
//   <motion.div
//     initial={false}
//     animate={{ opacity: isSelected ? 1 : 0 }}
//     transition={{ duration: 0.2 }}
//     style={{ pointerEvents: isSelected ? "auto" : "none" }}
//     className="overlay"
//   >
//     <Link to="/" />
//   </motion.div>
// );
