"use client";

import styles from "./GlobalFooter.module.scss";

import Link from "next/link";
import { useState } from "react";
import { motion, useSpring } from "framer-motion";

import Chevron from "./Chevron.js";

export default function SectionColumn({ sectionName, sectionLinks }) {
  const [expand, setExpand] = useState(false);

  return (
    <div className={styles["section-column"]}>
      <span className={styles["section-column-header"]}>{sectionName}</span>
      <button
        className={styles["section-column-button"]}
        onClick={() => {
          setExpand((prev) => !prev), console.log(expand);
        }}
      >
        <span>{sectionName}</span>
        <span>
          <Chevron isActive={expand} />
        </span>
      </button>
      <motion.ul
        className={` ${styles["section-column-links"]} ${styles["section-column-links--tab"]}`}
        animate={{ height: expand ? "auto" : "0" }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {sectionLinks.map((linkObject) => (
          <Link
            href={linkObject.link}
            key={linkObject.link}
            className={styles["section-column-link"]}
          >
            {linkObject.text}
          </Link>
        ))}
      </motion.ul>
    </div>
  );
}
