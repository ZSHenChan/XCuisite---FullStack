"use client";

import styles from "./login.module.scss";

import { useAuth0 } from "@auth0/auth0-react";

import { redirect } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import ButtonPrimaryOutline from "@/components/Buttons/ButtonPrimaryOutLine";
import LoginBenefits from "./LoginBenefits";
import ContinueGuest from "./ContinueGuest";

export default function SectionForgetLogin() {
  const { loginWithRedirect } = useAuth0();

  const { getTotalAmount, updateGuestCheckoutState } = useContext(CartContext);
  const totalAmount = getTotalAmount();

  const handleCheckoutLogin = () => {
    const customRedirectUri = `${window.location.origin}/checkout`;
    loginWithRedirect({
      appState: {
        targetUrl: customRedirectUri,
      },
    });
  };

  const handleGuestCheckout = () => {
    updateGuestCheckoutState(true);
    redirect("/checkout");
  };

  return (
    <div className={styles["section-login"]}>
      <div className={styles["section-login-left"]}>
        <LoginBenefits totalAmount={totalAmount}></LoginBenefits>
        <ButtonSecondary
          onClick={handleCheckoutLogin}
          className={styles["btn-login"]}
        >
          Login Now
        </ButtonSecondary>
      </div>
      <div className={styles["section-login-right"]}>
        <ContinueGuest />
        <ButtonPrimaryOutline onClick={handleGuestCheckout}>
          Continue as Guest
        </ButtonPrimaryOutline>
      </div>
    </div>
  );
}
