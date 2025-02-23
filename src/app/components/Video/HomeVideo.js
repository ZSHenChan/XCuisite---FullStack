"use client";

import styles from "./HomeVideo.module.scss";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HomeVideo() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section className={styles["hero"]}>
      <motion.div className={styles["video-container"]} style={{ opacity }}>
        {/* <img
          src="/videos/video-desktop-placeholder.jpg"
          alt="video placeholder"
          id="video-placeholder"
        /> */}
        <video
          id="video-desktop"
          type="video/mp4"
          className="intro-video"
          preload="metadata"
          muted
          playsInline
          autoPlay
        >
          <source
            src="/videos/intro-video-desktop.mp4"
            media="(min-width: 62em)"
          />
          <source src="/videos/intro-video-mobile.mp4" />
          Your browser does not support HTML5 video
        </video>
        {/* <video
            id="video-mobile"
            src="./src/videos/intro-video-mobile.mp4"
            type="video/mp4"
            className="intro-video"
            preload="none"
            style="display: none"
            muted
            playsInline
            autoPlay
          ></video> */}
      </motion.div>
    </section>
  );
}
