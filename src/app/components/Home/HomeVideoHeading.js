"use client";

import styles from "./home.module.scss";

import { motion } from "framer-motion";

export default function HomeVideoHeading() {
  return (
    <motion.div
      className={styles["hero-caption-container"]}
      initial={{ scale: 12 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2 }}
    >
      <h1 className={styles["hero-caption"]}>Strawberry Flamingo</h1>
    </motion.div>
  );
}
