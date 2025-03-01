"use client";

import styles from "./checkout.module.scss";

import { ApiPlaceOrder } from "@/api/handlePlaceOrder";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth0, useAuthToken } from "@auth0/auth0-react";
import { CartContext } from "@/context/CartContext";

import { AnimatePresence } from "motion/react";
import { LayoutGroup } from "framer-motion";
import toast from "react-hot-toast";

import { EmbeddedCheckoutButton } from "./embeddedCheckoutButton";
import { PaymentButton } from "./paymentButton";

import { SpinnerFull } from "@/components/Feedback/Spinner";
import SubheadingPage from "@/components/Headings/SubheadingPage";
import {
  FormAddress,
  FormShipping,
  FormCollectOption,
  FormDetails,
  FormBagSelect,
  FormSubmit,
} from "@/components/Forms/CheckoutForm";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import SectionProducts from "@/(pages)/bag/SectionProducts";
import SectionSummary from "@/(pages)/bag/SectionSummary";
import FormWrapper from "@/components/Wrappers/FormWrapper";

// const FormStringInput = ({
//   label,
//   type,
//   ref,
//   placeholder,
//   required,
//   className,
// }) => {
//   return (
//     <div className={styles.formGroup}>
//       <label htmlFor={label}>
//         {label.charAt(0).toUpperCase() + label.slice(1)}
//       </label>
//       {errors.label && <span className={styles.formError}>{errors.label}</span>}
//       <input
//         type={type}
//         id={label}
//         name={label}
//         placeholder={placeholder}
//         required={required}
//         ref={ref}
//       />
//     </div>
//   );
// };

export default function Checkout() {
  const router = useRouter();

  const {
    getCartItems,
    getGuestCheckoutState,
    setPickUp,
    getTotalAmount,
    getShippingAmount,
    getTaxAmount,
    getVoucherDiscountAmount,
    getDiscountVouchers,
    emptyCart,
  } = useContext(CartContext);

  const guestCheckoutState = getGuestCheckoutState();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <SpinnerFull />;
  }

  //* Payment
  const searchParams = useSearchParams();

  const search = searchParams.get("canceled");

  const [showAddressForm, setShowAddressForm] = useState(true);
  const [animateAddressForm, setAnimateAddressForm] = useState(true);

  const deliveryOptionRef = useRef(null);
  const addressRef = useRef(null);
  const shippingRef = useRef(null);
  const bagRef = useRef(null);
  const detailsRef = useRef(null);
  const submitRef = useRef(null);

  const [order, setOrder] = useState({
    userId: "user123",
    guest: guestCheckoutState,
    cartItems: getCartItems(),
    discounts: getDiscountVouchers(),
    taxAmount: getTaxAmount(),
    shippingAmount: getShippingAmount(),
    totalAmount: getTotalAmount(),
    token: null,
  });

  // // Redirect user if not authenticated or no items in cart
  // useEffect(() => {
  //   // console.log("Guest Checkout State:", guestCheckoutState);
  //   // console.log("Is Authenticated:", isAuthenticated);

  //   if (!guestCheckoutState && !isAuthenticated) {
  //     router.push("/checkout/login");
  //     return;
  //   }
  //   if (getCartItems().length === 0) {
  //     toast("Oops! Your cart is empty. Redirecting to offers page...");
  //     router.push("/offers");
  //   }
  // }, [guestCheckoutState, isAuthenticated, router, getCartItems]);

  const handleSelectPickup = () => {
    setAnimateAddressForm(false);
    setTimeout(() => {
      setShowAddressForm(false);
    }, 500);
    setPickUp(true);
  };

  const handleSelectDelivery = () => {
    if (showAddressForm) {
      setTimeout(() => {
        addressRef.current.scrollIntoView();
      }, 100);
    }
    setShowAddressForm(true);
    setPickUp(false);
    setTimeout(() => {
      setAnimateAddressForm(true);
    }, 0);
  };

  const handleFinishAddress = (data) => {
    // console.log(data);
    shippingRef.current.scrollIntoView();
  };

  const handleFinishShipping = (data) => {
    // console.log(data);
    bagRef.current.scrollIntoView();
  };

  const handleFinishBag = (data) => {
    // console.log(data);
    detailsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleFinishDetails = (data) => {
    // console.log(data);

    submitRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const validateAllForms = async () => {
    const deliveryOptionData =
      await deliveryOptionRef.current.extractAndValidateData();
    const addressData = await addressRef.current?.extractAndValidateData();
    const shippingData = await shippingRef.current?.extractAndValidateData();
    const bagData = await bagRef.current.extractAndValidateData();
    const detailsData = await detailsRef.current.extractAndValidateData();

    if (!deliveryOptionData.isValid) return false;
    if (!bagData.isValid) return false;
    if (!detailsData.isValid) return false;
    if (deliveryOptionData.data.deliveryOption == "delivery") {
      if (!addressData.isValid) return false;
      if (!shippingData.isValid) return false;
    }
    return true;
  };

  const handleSuccessPlaceOrder = () => {
    router.push("/checkout-success");
    emptyCart();
  };

  const handleFinishSubmit = async () => {
    // const validateToast = toast.loading("Validating order details...");
    // const validEntries = await validateAllForms();
    // if (!validEntries) {
    //   toast.error("Please check your order details.", { id: validateToast });
    //   return;
    // } else {
    //   toast.success("Order details validated.", { id: validateToast });
    // }

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    const toastPlaceOrder = toast.loading("Placing order...");
    const updatedOrder = {
      ...order,
      address: addressRef.current?.extractAndValidateData().data,
      shippingInfo: shippingRef.current?.extractAndValidateData().data,
      bag: bagRef.current.extractAndValidateData().data,
      details: detailsRef.current.extractAndValidateData().data,
      orderNotes: detailsRef.current.extractAndValidateData().data.orderNotes,
    };

    const [data, err] = await ApiPlaceOrder(updatedOrder);

    if (err) {
      toast.error("Unable to place order. Please try again later.", {
        id: toastPlaceOrder,
      });
      return;
    }

    toast.success("Order placed successfully!", { id: toastPlaceOrder });
  };

  return (
    <div>
      <SectionWrapper className={styles["section-wrapper"]}>
        <div className={styles["section-left"]}>
          <SubheadingPage>Secure Checkout</SubheadingPage>
          <SectionProducts className={styles["products"]} />
          <SectionSummary
            className={styles["summary"]}
            showCheckoutButton={false}
          />
        </div>

        <div className={styles["section-right"]}>
          <LayoutGroup>
            <FormWrapper>
              <FormCollectOption
                ref={deliveryOptionRef}
                onPickUpSelect={handleSelectPickup}
                onDeliverySelect={handleSelectDelivery}
              />
            </FormWrapper>
            {showAddressForm && (
              <>
                <AnimatePresence>
                  <FormWrapper show={showAddressForm}>
                    <FormAddress
                      ref={addressRef}
                      onFinish={handleFinishAddress}
                      showAddressForm={animateAddressForm}
                    />
                  </FormWrapper>
                </AnimatePresence>
                <AnimatePresence>
                  <FormWrapper show={showAddressForm}>
                    <FormShipping
                      ref={shippingRef}
                      onFinish={handleFinishShipping}
                      showShippingForm={animateAddressForm}
                    />
                  </FormWrapper>
                </AnimatePresence>
              </>
            )}
            <FormWrapper>
              <FormBagSelect ref={bagRef} onFinish={handleFinishBag} />
            </FormWrapper>
            <FormWrapper>
              <FormDetails ref={detailsRef} onFinish={handleFinishDetails} />
            </FormWrapper>
            <FormWrapper>
              <FormSubmit
                submitRef={submitRef}
                onFinish={handleFinishSubmit}
                totalAmount={getTotalAmount()}
              />
              {/* <EmbeddedCheckoutButton /> */}
              <PaymentButton />
            </FormWrapper>
          </LayoutGroup>
        </div>
      </SectionWrapper>
    </div>
  );
}
