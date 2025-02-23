import styles from "./Card.module.scss";

import { motion } from "framer-motion";

export function Overlay({ hidden, onHideModal }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: !hidden ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={styles["overlay"]}
      style={{ pointerEvents: !hidden ? "auto" : "none" }}
      onClick={onHideModal}
    ></motion.div>
  );
}
