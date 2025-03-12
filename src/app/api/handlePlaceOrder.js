"use client";

// import {
//   OrderRequest,
//   ShippingInfo,
//   BillingInfo,
//   Address,
//   OrderItem,
//   Discount,
//   OrderResponse,
// } from "@/lib/proto/orderService_pb";

// import { orderServiceClient } from "@/lib/grpc/xcuisite.Client/grpcClient";
import { wrapApi } from "@/utils/asyncWrap";
import { OrderResponse, OrderRequest } from "@/data/models/Order";
import { env } from "@/data/env/client";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

async function placeOrder(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/Order`, options);

      if (!response.ok) {
        console.error(response);
        const errorText = await response.text(); // Get the error message
        reject(`HTTP error! status: ${response.status}, message: ${errorText}`);
        return;
      }

      const data = await response.json(); // Or response.text() if it's not JSON
      resolve(data);
    } catch (error) {
      console.error("Fetch error:", error);
      reject("Unable to reach server.");
    }
  });
}

export async function ApiPlaceOrder(order) {
  var createdAt = new Date().toISOString();

  await new Promise((r) => setTimeout(r, 3000));

  const req = new OrderRequest(
    order.userId,
    order.guest,
    order.collectOption,
    order.shippingInfo,
    order.billingInfo,
    order.items,
    order.discounts,
    order.tax,
    order.bag,
    order.shippingAmount,
    order.totalAmount,
    order.details,
    createdAt
  );

  // console.log("Request:");
  // console.log(JSON.stringify(req));

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
    "Authorization": `Bearer ${order.token}`,
  };

  const [data, err] = await wrapApi(placeOrder(options));

  if (err) {
    return [null, err];
  }

  return [{ orderId: data.orderId, message: data.message }, null];
}
