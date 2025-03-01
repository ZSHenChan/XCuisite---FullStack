import styles from "./wrappers.module.scss";

import { motion } from "framer-motion";

export default function FormWrapper({ children, className, show = true }) {
  return (
    <motion.div
      className={`${styles["wrapper-form"]} ${className}`}
      layout
      initial={false}
    >
      {children}
    </motion.div>
  );
}
