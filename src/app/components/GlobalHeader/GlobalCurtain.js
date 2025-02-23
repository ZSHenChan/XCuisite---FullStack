import GlobalCurtainCart from "./GlobalCurtainCart";

import styles from "./GlobalCurtain.module.scss";

export default function GlobalCurtain({
  children,
  curtainFlyout,
  closeCurtain,
  className,
}) {
  return (
    <>
      <div
        className={`${styles["global-curtain"]} ${
          curtainFlyout ? styles["curtain-flyout"] : ""
        }`}
        id="cart-curtain"
      >
        <GlobalCurtainCart closeCurtain={closeCurtain} />
      </div>
      <div
        className={`${styles["global-curtain-bottom"]} ${
          curtainFlyout ? styles["global-curtain-bottom-flyout"] : ""
        }`}
        id="global-curtain-bottom"
        onClick={closeCurtain}
      ></div>
    </>
  );
}
