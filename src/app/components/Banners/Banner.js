import styles from "./Banner.module.scss";
// import { Img } from "react-image";

export default function Banner({ alt, imgSrc }) {
  if (!imgSrc) return <></>;
  return (
    <div>
      <img
        srcSet={`/images/banners/${imgSrc}-banner-mobile.jpeg 450w, /images/banners/${imgSrc}-banner-mobile.jpeg 600w, /images/banners/${imgSrc}-banner-desktop.jpeg 1200w`}
        sizes="(max-width:450px) 100%, (max-width:600px) 100%, (max-width:1200px) 100%"
        alt={alt}
        src={`/images/banners/${imgSrc}-banner-desktop.jpeg`}
        className={styles["banner"]}
      />
    </div>
  );
}
