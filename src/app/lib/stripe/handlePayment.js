import { getStripe } from "@/lib/stripe/getStripe";
import { setLocalStorageItem } from "@/utils/localStorage";
import { env } from "@/data/env/client";

export const handlePayment = async (checkoutItems) => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutItems),
      }
    );

    const checkoutSession = await response.json();
    if (!response.ok) {
      console.error(checkoutSession || "Error creating checkout session.");
    }

    setLocalStorageItem("checkoutSessionId", checkoutSession.id);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (error) {
      console.error("Stripe error:", error);
      toast.error("Stripe error. Please try again.");
    }
  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error. Please try again.");
  }
};
