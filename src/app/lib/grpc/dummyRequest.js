import {
  OrderRequest,
  ShippingInfo,
  BillingInfo,
  Address,
  OrderItem,
  Discount,
  OrderResponse,
} from "@/lib/proto/orderService_pb";

export default function DummyRequest() {
  const request = new OrderRequest();
  request.setUserId("user123");
  request.setGuest(false);

  // Create ShippingInfo
  const shippingInfo = new ShippingInfo();
  shippingInfo.setFullName("John Doe");
  shippingInfo.setPhone("123-456-7890");
  shippingInfo.setShippingMethod("Standard");

  const shippingAddress = new Address();
  shippingAddress.setStreet("123 Main St");
  shippingAddress.setCity("Anytown");
  shippingAddress.setState("CA");
  shippingAddress.setZip("12345");
  shippingAddress.setCountry("USA");

  shippingInfo.setAddress(shippingAddress);
  request.setShippingInfo(shippingInfo);

  // Create BillingInfo
  const billingInfo = new BillingInfo();
  billingInfo.setFullName("John Doe");
  // billingInfo.setPaymentMethod(PaymentType.CREDITCARD);
  billingInfo.setTransactionId("txn123");

  const billingAddress = new Address();
  billingAddress.setStreet("123 Main St");
  billingAddress.setCity("Anytown");
  billingAddress.setState("CA");
  billingAddress.setZip("12345");
  billingAddress.setCountry("USA");

  billingInfo.setAddress(billingAddress);
  request.setBillingInfo(billingInfo);

  // Add Items
  const item = new OrderItem();
  item.setProductId("prod123");
  item.setName("Doughnut");
  item.setQuantity(2);
  item.setPrice(1.99);
  item.setSubtotal(3.98);

  request.setItemsList([item]);

  // Add Discounts
  const discount = new Discount();
  discount.setCode("SAVE10");
  discount.setAmount(0.5);

  request.setDiscountsList([discount]);

  // Set Tax, Shipping Cost, and Total Amount
  request.setTax(0.3);
  request.setShippingCost(2.0);
  request.setTotalAmount(5.78);
  request.setOrderNotes("Please deliver between 9 AM and 5 PM.");
  request.setCreatedAt("2023-10-01T12:00:00Z");

  return request;
}
