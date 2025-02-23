"use client";

// Bootstrap import
import globalStyles from "@/styles/globals.scss";
import styles from "./GlobalHeader.module.scss";
import Navbar from "./Navbar";
import GlobalCurtain from "./GlobalCurtain";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GlobalHeader() {
  const [flyout, setFlyout] = useState(false);
  const toggleCurtainFlyout = () => {
    setFlyout((prev) => !prev);
  };

  const closeCurtain = () => {
    setFlyout(false);
  };

  return (
    <header className={styles["global-header"]}>
      <Navbar onClickCart={toggleCurtainFlyout} />
      <GlobalCurtain curtainFlyout={flyout} closeCurtain={closeCurtain} />
    </header>
  );
}
