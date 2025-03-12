"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { setLocalStorageItem, getLocalStorageItem } from "@/utils/localStorage";
import {
  SHIPPING_AMOUNT,
  MIN_NO_SHIP_FEE,
  SHIPPING_METHODS,
  HUNGRY_SHIP_FEE,
} from "@/lib/constants";

// Create the CartContext
export const CartContext = createContext(null);

const EMPTY_CART = {
  totalAmount: 0,
  totalQuantity: 0,
  items: [],
};

// * Export functions
export function CartProvider({ children }) {
  const [loadingCart, setLoadingCart] = useState(true);
  const [cartContext, setCartContext] = useState({
    pickUp: false,
    guestCheckout: false,
    cart: EMPTY_CART,
    voucher_discounts: [],
    shippingMethod: "standard",
  });

  useEffect(() => {
    const localStorageCart = getLocalStorageItem("cart");
    if (localStorageCart) {
      setCartContext((prevCart) => ({
        ...prevCart,
        cart: localStorageCart,
      }));
    }
    setLoadingCart(false);

    const guestCheckout = getLocalStorageItem("guestCheckout");
    updateGuestCheckoutState(guestCheckout);
  }, []);

  const getCart = useCallback(() => {
    return cartContext.cart;
  }, [cartContext.cart]);

  const getCartQuantity = useCallback(() => {
    return cartContext.cart.totalQuantity;
  }, [cartContext]);

  const getCartItems = useCallback(() => {
    return cartContext.cart.items;
  }, [cartContext.cart.items]);

  const getGuestCheckoutState = useCallback(() => {
    return cartContext.guestCheckout;
  }, [cartContext.guestCheckout]);

  const getPickUp = useCallback(() => {
    return cartContext.pickUp;
  }, [cartContext.pickUp]);

  const setShippingMethod = useCallback((method) => {
    setCartContext((prevCart) => ({
      ...prevCart,
      shippingMethod: method,
    }));
  }, []);

  const setPickUp = useCallback((pickUp) => {
    setCartContext((prevCart) => ({
      ...prevCart,
      pickUp: pickUp,
    }));
  }, []);

  const updateGuestCheckoutState = useCallback((state) => {
    setCartContext((prevCart) => ({
      ...prevCart,
      guestCheckout: state,
    }));
    setLocalStorageItem("guestCheckout", state);
  }, []);

  const addToCart = useCallback((item, quantity) => {
    item.quantity = quantity;

    setCartContext((prevCart) => {
      const existingItemIndex = prevCart.cart.items.findIndex(
        (i) => i.id === item.id
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        updatedItems = prevCart.cart.items.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        updatedItems = [...prevCart.cart.items, item];
      }

      const updatedCart = {
        ...prevCart,
        cart: {
          totalQuantity: prevCart.cart.totalQuantity + quantity,
          items: updatedItems,
        },
      };

      setLocalStorageItem("cart", updatedCart.cart); // Persist in localStorage
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartContext((prevCart) => {
      const updatedItems = prevCart.cart.items.filter(
        (item) => item.id !== itemId
      );
      const updatedTotalQty = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const updatedCart = {
        ...prevCart,
        cart: {
          ...prevCart.cart,
          totalQuantity: updatedTotalQty,
          items: updatedItems,
        },
      };

      setLocalStorageItem("cart", updatedCart.cart); // Persist in localStorage
      return updatedCart;
    });
  }, []);

  const emptyCart = useCallback(() => {
    setCartContext((prevCart) => {
      const updatedCart = {
        ...prevCart,
        cart: EMPTY_CART,
      };

      setLocalStorageItem("cart", updatedCart.cart);
      return updatedCart;
    });
  }, []);

  const getTotalDiscountAmount = useCallback(() => {
    let total = cartContext.voucher_discounts.reduce((sum, discount) => {
      return sum + discount.amount;
    }, 0);

    return parseFloat(total.toFixed(2));
  }, [cartContext.cart, cartContext.voucher_discounts]);

  const getSubtotalAmount = useCallback(() => {
    let total = cartContext.cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return parseFloat(total.toFixed(2));
  }, [cartContext]);

  const getTaxAmount = useCallback(() => {
    return 0;
  }, []);

  const getDiscountVouchers = useCallback(() => {
    return [];
  }, []);

  const getVoucherDiscountAmount = useCallback(() => {
    return 0;
  }, []);

  const getShippingAmount = useCallback(() => {
    var subAmount;
    if (!getPickUp() && getSubtotalAmount() < MIN_NO_SHIP_FEE) {
      subAmount = SHIPPING_AMOUNT;
    } else {
      subAmount = 0;
    }
    return (subAmount +=
      cartContext.shippingMethod === "hungry" ? HUNGRY_SHIP_FEE : 0);
  }, [getPickUp, getSubtotalAmount, cartContext.shippingMethod]);

  const getTotalAmount = useCallback(() => {
    let subtotal = getSubtotalAmount();
    subtotal += getShippingAmount();
    let total = (subtotal -= getTotalDiscountAmount());
    return parseFloat(total.toFixed(2));
  }, [getSubtotalAmount, getPickUp]);

  const updateLocalStorage = () => {
    setLocalStorageItem("cart", getCartItems());
  };

  return (
    <CartContext.Provider
      value={{
        cartContext,
        addToCart,
        removeFromCart,
        getCart,
        getCartQuantity,
        getCartItems,
        getGuestCheckoutState,
        getShippingAmount,
        getTaxAmount,
        getTotalDiscountAmount,
        getDiscountVouchers,
        getVoucherDiscountAmount,
        getPickUp,
        setPickUp,
        setShippingMethod,
        updateGuestCheckoutState,
        emptyCart,
        getTotalAmount,
        getSubtotalAmount,
        updateLocalStorage,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
