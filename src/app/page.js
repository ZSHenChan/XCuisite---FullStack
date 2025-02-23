import styles from "@/components/Home/home.module.scss";

import { SpinnerFull } from "./components/Feedback/Spinner";

import HomeVideo from "@/components/Video/HomeVideo";
import HomeVideoHeading from "./components/Home/HomeVideoHeading";
import PostIntro from "@/components/Home/PostIntro";

export default function Home() {
  return (
    <div className={styles["home"]}>
      <HomeVideoHeading />
      <HomeVideo />
      <PostIntro />
    </div>
  );
}
