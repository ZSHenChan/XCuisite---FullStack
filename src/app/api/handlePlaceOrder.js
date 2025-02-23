"use client";

import {
  OrderRequest,
  ShippingInfo,
  BillingInfo,
  Address,
  OrderItem,
  Discount,
  OrderResponse,
} from "@/lib/proto/orderService_pb";

import { orderServiceClient } from "@/lib/grpc/xcuisite.Client/grpcClient";
import { wrapApi } from "@/utils/asyncWrap";

async function placeOrder(request, token) {
  const metadata = {
    "Content-Type": "application/grpc-web+proto",
    "X-User-Agent": "grpc-web-javascript/0.1",
    "X-Grpc-Web": "1",
    "Authorization": `Bearer ${token}`,
  };

  return new Promise((resolve, reject) => {
    orderServiceClient.placeOrder(request, metadata, (err, res) => {
      if (err) {
        console.error(err);
        return reject("Unable to reach server.");
      }
      if (!res) {
        console.error("No response received.");
        return reject("No response from server.");
      }
      return resolve(res);
    });
  });
}

export async function ApiPlaceOrder({
  userId,
  guest,
  deliveryOption,
  shippingInfo = null,
  billingInfo,
  address = null,
  cartItems,
  discounts,
  taxAmount,
  shippingAmount,
  totalAmount,
  orderNotes,
  token,
}) {
  // console.log(`Received data:
  //   userId: ${userId},
  //   guest: ${guest},
  //   shippingInfo: ${shippingInfo},
  //   billingInfo: ${billingInfo},
  //   address: ${address},
  //   cartItems: ${cartItems},
  //   discounts: ${discounts},
  //   taxAmount: ${taxAmount},
  //   shippingAmount: ${shippingAmount},
  //   totalAmount: ${totalAmount},
  //   orderNotes: ${orderNotes},
  //   token: ${token}
  // `);

  await new Promise((r) => setTimeout(r, 3000));

  const req = convertRequest({
    userId,
    guest,
    deliveryOption,
    shippingInfo,
    billingInfo,
    address,
    cartItems,
    discounts,
    taxAmount,
    shippingAmount,
    totalAmount,
    orderNotes,
    token,
  });

  const [data, err] = await wrapApi(placeOrder(req, token));

  if (err) {
    return [null, err];
  }

  return [{ orderId: data.getOrderId(), message: data.getMessage() }, null];
}

function convertRequest({
  userId,
  guest,
  deliveryOption,
  shippingInfo,
  billingInfo = null,
  address,
  cartItems,
  discounts,
  taxAmount,
  shippingAmount,
  totalAmount,
  orderNotes,
  token,
}) {
  const req = new OrderRequest();
  req.setUserId(userId);
  req.setGuest(guest);

  if (deliveryOption == "delivery") {
    const addressObject = new Address();
    addressObject.setStreet(address.street);
    addressObject.setCity(address.city);
    addressObject.setState(address.state);
    addressObject.setZip(address.zip);
    addressObject.setCountry(address.country);

    const shippingInfoObject = new ShippingInfo();
    shippingInfoObject.setFullName("John Doe");
    shippingInfoObject.setPhone("123-456-7890");
    shippingInfoObject.setShippingMethod("Standard");
    shippingInfoObject.setAddress(addressObject);
    req.setShippingInfo(shippingInfoObject);
  }

  const billingInfoObject = new BillingInfo();
  billingInfoObject.setFullName("John Doe");
  // billingInfoObject.setPaymentMethod(PaymentType.CREDITCARD);
  billingInfoObject.setTransactionId("txn123");
  if (deliveryOption == "delivery") billingInfoObject.setAddress(addressObject);
  req.setBillingInfo(billingInfoObject);

  const discountObject = new Discount();
  discountObject.setCode("");
  discountObject.setCode(0);
  req.setDiscountsList([discountObject]);

  const itemsList = convertCartItemsToItemsObject(cartItems);
  req.setItemsList(itemsList);

  req.setTax(taxAmount ? taxAmount : 0);
  req.setShippingCost(shippingAmount ? shippingAmount : 0);
  req.setTotalAmount(totalAmount ? totalAmount : 0);

  req.setOrderNotes(orderNotes);
  req.setCreatedAt(new Date().toISOString());

  return req;
}

function convertCartItemsToItemsObject(cartItems) {
  const modifiedItems = [];
  cartItems.map((item) => {
    const modifiedItem = new OrderItem();
    modifiedItem.setProductId(item.id);
    modifiedItem.setName(item.productName);
    modifiedItem.setQuantity(item.quantity);
    modifiedItem.setPrice(item.price);
    modifiedItem.setSubtotal(item.price * item.quantity);

    modifiedItems.push(modifiedItem);
  });
  return modifiedItems;
}
