"use client";

import styles from "./home.module.scss";

import { motion } from "framer-motion";

export default function HeroCta() {
  return <motion.div className={styles["hero-cta"]}>Get Now</motion.div>;
}
