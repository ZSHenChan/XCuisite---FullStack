"use client";

import globals from "@/styles/globals.scss";
import styles from "./offers.module.scss";

import Banner from "@/components/Banners/Banner";
import Modal from "@/components/Modals/Modal";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import HeadingPage from "@/components/Headings/HeadingPage";
import ProductsGrid from "./ProductsGrid";

import { useState } from "react";

export default function Offers() {
  return (
    <div>
      <Banner imgSrc="offers" alt="Offers Banner" />
      <SectionWrapper>
        <section>
          <HeadingPage>Offers</HeadingPage>
          <ProductsGrid />
        </section>
      </SectionWrapper>
    </div>
  );
}
