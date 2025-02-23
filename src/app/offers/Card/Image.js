import styles from "./Card.module.scss";

import { motion, useTransform, useMotionValue } from "framer-motion";
import { closeSpring } from "./animations";

import { CardBody } from "./CardBody";

export const Image = ({
  id,
  alt,
  isSelected,
  // pointOfInterest = 120,
  backgroundColor,
}) => {
  const scale = useMotionValue(1);
  const inverted = useTransform(scale, (s) => 1 / s);

  return (
    <motion.div
      className={styles["card-image-container"]}
      style={{ ...inverted, originX: 0, originY: 0 }}
      layout
    >
      <motion.img
        className={styles["card-image"]}
        src={`images/products/${id}.jpg`}
        alt={alt}
        initial={false}
        animate={isSelected ? { x: 0, y: -10 } : { x: 0, y: 0 }}
        transition={closeSpring}
      />
    </motion.div>
  );
};
