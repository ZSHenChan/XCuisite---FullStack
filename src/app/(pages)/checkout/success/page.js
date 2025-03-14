import Banner from "@/components/Banners/Banner";
import HeadingPage from "@/components/Headings/HeadingPage";
import SubheadingPage from "@/components/Headings/SubheadingPage";
import SuccessCard from "./successCard";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";

export default function CheckoutSuccess() {
  return (
    <div>
      <SectionWrapper>
        <HeadingPage>Success!</HeadingPage>
        <SuccessCard />
      </SectionWrapper>
    </div>
  );
}
