"use client";

import styles from "./checkout.module.scss";

import { ApiPlaceOrder } from "@/api/handlePlaceOrder";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth0, useAuthToken } from "@auth0/auth0-react";
import { CartContext } from "@/context/CartContext";
import { setLocalStorageItem, getLocalStorageItem } from "@/utils/localStorage";

import { AnimatePresence } from "motion/react";
import { LayoutGroup } from "framer-motion";
import toast from "react-hot-toast";

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

import { env } from "@/data/env/client";
import {
  EMPTY_CART_REDIRECT_TIME,
  FINISH_PAYMENT_REDIRECT_TIME,
} from "@/lib/constants";

import { handlePayment } from "@/lib/stripe/handlePayment";

export default function Checkout() {
  const DEBUG_FORM = false;
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
    loadingCart,
  } = useContext(CartContext);

  const guestCheckoutState = getGuestCheckoutState();
  const { isAuthenticated, isLoading } = useAuth0();

  //* Payment
  const searchParams = useSearchParams();

  const search = searchParams.get("canceled");
  const sessionId = searchParams.get("session_id");

  const [showAddressForm, setShowAddressForm] = useState(true);
  const [animateAddressForm, setAnimateAddressForm] = useState(true);

  const collectOptionRef = useRef(null);
  const addressRef = useRef(null);
  const shippingRef = useRef(null);
  const bagRef = useRef(null);
  const detailsRef = useRef(null);
  const submitRef = useRef(null);

  const handleSuccessPlaceOrder = () => {
    toast.success(
      "Placed order successful! Redirecting to order confirmation..."
    );
    setLocalStorageItem("order", null);
    setLocalStorageItem("guestCheckout", null);
    setTimeout(() => {
      router.push("/checkout/success");
    }, FINISH_PAYMENT_REDIRECT_TIME);
    emptyCart();
  };

  const handlePlaceOrder = async () => {
    toast.success("Payment successful!");
    const toastPlaceOrder = toast.loading("Placing order...");
    const updatedOrder = getLocalStorageItem("order");

    const [data, err] = await ApiPlaceOrder(updatedOrder);

    if (err) {
      toast.error(
        "Unable to place order. Please contact our customer service.",
        {
          id: toastPlaceOrder,
        }
      );
      return;
    }

    handleSuccessPlaceOrder();
  };

  useEffect(() => {
    const checkParams = async () => {
      if (search) {
        toast.error("Payment cancelled. Please try again.");
      }
      if (sessionId) {
        if (sessionId === getLocalStorageItem("checkoutSessionId")) {
          setLocalStorageItem("checkoutSessionId", null);
          await handlePlaceOrder();
        }
      }
    };

    checkParams();

    // console.log("Guest Checkout State:", guestCheckoutState);
    // console.log("Is Authenticated:", isAuthenticated);
    if (!loadingCart && !guestCheckoutState && !isAuthenticated) {
      router.push("/checkout/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (getCartItems().length === 0 && !loadingCart) {
      toast("Oops! Your cart is empty. Redirecting to offers page...");
      setTimeout(() => {
        router.push("/offers");
      }, EMPTY_CART_REDIRECT_TIME);
    }
  }, [getCartItems()]);

  if (isLoading || loadingCart) {
    return <SpinnerFull />;
  }

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
    if (DEBUG_FORM) console.log(data);
    shippingRef.current.scrollIntoView();
  };

  const handleFinishShipping = (data) => {
    if (DEBUG_FORM) console.log(data);
    bagRef.current.scrollIntoView();
  };

  const handleFinishBag = (data) => {
    if (DEBUG_FORM) console.log(data);
    detailsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleFinishDetails = (data) => {
    if (DEBUG_FORM) console.log(data);

    submitRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const validateAllForms = async () => {
    const collectOptionData =
      await collectOptionRef.current.extractAndValidateData();
    const addressData =
      collectOptionData.data?.deliveryOption == "delivery"
        ? await addressRef.current.extractAndValidateData()
        : null;
    if (DEBUG_FORM) console.log(`Address data: ${addressData}`);
    const shippingData =
      collectOptionData.data?.deliveryOption == "delivery"
        ? await shippingRef.current.extractAndValidateData()
        : null;
    if (DEBUG_FORM) console.log(`Shipping data: ${shippingData}`);
    const bagData = await bagRef.current.extractAndValidateData();
    const detailsData = await detailsRef.current.extractAndValidateData();

    if (!collectOptionData.isValid)
      return { message: "Invalid Delivery Option.", valid: false };
    if (!bagData.isValid)
      return { message: "Invalid Bag Option.", valid: false };
    if (!detailsData.isValid)
      return { message: "Invalid Details.", valid: false };
    if (collectOptionData.data.deliveryOption == "delivery") {
      if (!addressData.isValid)
        return { message: "Invalid Address.", valid: false };
      if (!shippingData.isValid)
        return { message: "Invalid Shipping Details.", valid: false };
    }

    return { message: "Order details validated.", valid: true };
  };

  const handleFinishSubmit = async () => {
    const validateToast = toast.loading("Validating order details...");
    const validateState = await validateAllForms();
    if (!validateState.valid) {
      toast.error(`${validateState.message}`, { id: validateToast });
      return;
    } else {
      toast.success(validateState.message, { id: validateToast });
    }

    createOrderRequest();
    const checkoutItems = getCartItems().map((item) => ({
      Price: item.priceId,
      Quantity: item.quantity,
    }));
    await handlePayment(checkoutItems);
  };

  const createOrderRequest = async () => {
    const collectOptionData =
      await collectOptionRef.current.extractAndValidateData();
    const addressData =
      collectOptionData.data.deliveryOption === "delivery"
        ? await addressRef.current.extractAndValidateData()
        : null;
    const shippingData =
      collectOptionData.data.deliveryOption === "delivery"
        ? await shippingRef.current.extractAndValidateData()
        : null;
    const bagData = await bagRef.current.extractAndValidateData();
    const detailsData = await detailsRef.current.extractAndValidateData();
    const details = {
      ...detailsData.data,
      rating: detailsData.data.rating.toString(),
    };

    const items = getCartItems().map((item) => ({
      ProductId: item.id.toString(),
      Quantity: item.quantity.toString(),
    }));

    const order = {
      userId: "user123",
      guest: guestCheckoutState,
      items: items,
      discounts: getDiscountVouchers(),
      tax: getTaxAmount().toString(),
      shippingAmount: getShippingAmount().toString(),
      totalAmount: getTotalAmount().toString(),
      collectOption: collectOptionData.data,
      address: addressData?.data,
      shippingInfo: shippingData?.data,
      bag: bagData.data,
      details: detailsData.data,
      token: null,
    };

    setLocalStorageItem("order", order);
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
                ref={collectOptionRef}
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
                onClick={handlePlaceOrder}
              ></FormSubmit>
            </FormWrapper>
          </LayoutGroup>
        </div>
      </SectionWrapper>
    </div>
  );
}
