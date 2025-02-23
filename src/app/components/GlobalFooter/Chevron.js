import styles from "./GlobalFooter.module.scss";

import { motion } from "framer-motion";

export default function Chevron({ isActive, props }) {
  return (
    <motion.svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={13.001}
      height={22.999}
      style={{
        enableBackground: "new 0 0 12.001 22.999",
      }}
      className={` ${styles.icon}`}
      viewBox="0 0 40.001 40.001"
      whileHover={{ scale: 1.2, transition: { duration: 0.05 } }}
      animate={{
        rotate: isActive ? -90 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.1,
      }}
    >
      <path d="M24.998 40.094a3.484 3.484 0 0 1 0 4.893 3.404 3.404 0 0 1-4.846 0L1.004 25.447a3.486 3.486 0 0 1 0-4.895L20.152 1.014a3.402 3.402 0 0 1 4.846 0 3.484 3.484 0 0 1 0 4.893L9.295 23l15.703 17.094z" />
    </motion.svg>
  );
}
