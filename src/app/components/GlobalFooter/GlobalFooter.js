import styles from "./GlobalFooter.module.scss";

import { FOOTER_COLUMNS } from "@/lib/constants";
import FooterColumn from "./FooterColumn";
import SectionColumn from "./SectionColumn";

import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className={styles["global-footer"]}>
      <div className={styles["global-footer-grid"]}>
        <FooterColumn>
          <SectionColumn
            sectionName={"Shop"}
            sectionLinks={FOOTER_COLUMNS.Shop}
          />
          <SectionColumn
            sectionName={"About Us"}
            sectionLinks={FOOTER_COLUMNS["About Us"]}
          />
          <SectionColumn
            sectionName={"Policies"}
            sectionLinks={FOOTER_COLUMNS.Policies}
          />
        </FooterColumn>
        <FooterColumn>
          <SectionColumn
            sectionName={"Account"}
            sectionLinks={FOOTER_COLUMNS.Account}
          />

          <SectionColumn
            sectionName={"Contact"}
            sectionLinks={FOOTER_COLUMNS["Contact"]}
          />
          <SectionColumn
            sectionName={"Company"}
            sectionLinks={FOOTER_COLUMNS["Company"]}
          />
        </FooterColumn>
        <FooterColumn>
          <SectionColumn
            sectionName={"Stores"}
            sectionLinks={FOOTER_COLUMNS.Stores}
          />
          <SectionColumn
            sectionName={"Follow Us"}
            sectionLinks={FOOTER_COLUMNS["Follow Us"]}
          />
        </FooterColumn>
      </div>
      <div className={styles["mini-shop"]}>
        Check out our products:&nbsp;&nbsp;
        <Link href="/offers">Click Here</Link>
        &nbsp;&nbsp;or call 012-345-6789
      </div>
      <div className={styles["copyright"]}>
        Copyright &copy; {new Date().getFullYear()}&nbsp;XCuisite Inc. All
        Rights Reserved.
      </div>
    </footer>
  );
}
