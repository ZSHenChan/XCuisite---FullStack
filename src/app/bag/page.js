import styles from "./bag.module.scss";

import SectionTotal from "./SectionTotal";
import WeAccept from "./weAccept";
import SectionProducts from "./SectionProducts";
import SectionSummary from "./SectionSummary";

export default function Bag() {
  return (
    <div className={`${styles["checkout-main"]}`}>
      <SectionTotal />
      <WeAccept />
      <SectionProducts />
      <SectionSummary />
    </div>
  );
}
