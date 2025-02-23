import Banner from "@/components/Banners/Banner";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <Banner imgSrc="checkout" alt="Checkout Page Banner"></Banner>
      {children}
    </>
  );
}
