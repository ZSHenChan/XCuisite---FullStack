// OrderResponse.js
export class OrderResponse {
  constructor(orderId, status, message) {
    this.OrderId = orderId;
    this.Status = status;
    this.Message = message;
  }
}

// OrderRequest.js
export class OrderRequest {
  constructor(
    userId,
    guest = false,
    collectOption,
    shippingInfo,
    billingInfo,
    items = [],
    discounts = [],
    tax = 0,
    bag = null,
    shippingAmount = 0,
    totalAmount = 0,
    details = null,
    createdAt = null
  ) {
    this.UserId = userId;
    this.Guest = guest;
    this.ShippingInfo = shippingInfo;
    this.BillingInfo = billingInfo;
    this.CollectOption = collectOption;
    this.Items = items;
    this.Discounts = discounts;
    this.Bag = bag;
    this.Tax = tax;
    this.ShippingCost = shippingAmount;
    this.TotalAmount = totalAmount;
    this.Details = details;
    this.CreatedAt = createdAt;
  }
}

export class CollectOption {
  constructor(deliveryOption, store) {
    this.DeliveryOption = deliveryOption;
    this.Store = store;
  }
}

export class Details {
  constructor(notes, rating, comment) {
    this.Notes = notes;
    this.Rating = rating;
    this.Comment = comment;
  }
}

export class Bag {
  constructor(bagOption) {
    this.BagOption = bagOption;
  }
}

// ShippingInfo.js
export class ShippingInfo {
  constructor(fullName, shippingMethod, phone, address) {
    this.FullName = fullName;
    this.ShippingMethod = shippingMethod;
    this.Phone = phone;
    this.Address = address;
  }
}

// BillingInfo.js
export class BillingInfo {
  constructor(fullName, transactionId, address) {
    this.FullName = fullName;
    this.TransactionId = transactionId;
    this.Address = address;
  }
}

// Address.js
export class Address {
  constructor(
    street = null,
    city = null,
    state = null,
    zip = null,
    country = null
  ) {
    this.Street = street;
    this.City = city;
    this.State = state;
    this.Zip = zip;
    this.Country = country;
  }
}

// OrderItem.js
export class OrderItem {
  constructor(productId, quantity) {
    this.ProductId = productId;
    this.Quantity = quantity;
  }
}

// Discount.js
export class Discount {
  constructor(code, amount) {
    this.Code = code;
    this.Amount = amount;
  }
}

// PaymentType.js (Optional, if you're not using gRPC)
// export const PaymentType = {
//   CreditCard: 0,
//   Paypal: 1,
//   BankTransfer: 2,
//   Stripe: 3,
// };
