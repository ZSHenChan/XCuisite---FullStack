import { OrderServiceClient } from "@/lib/proto/orderService_grpc_web_pb.js";
import { PricingClient } from "@/lib/proto/price_grpc_web_pb";
import { GetProductsServiceClient } from "@/lib/proto/products_grpc_web_pb";
// import { grpc } from "@improbable-eng/grpc-web";

// envoy listens on 8080
const BASE_URL = "http://localhost:";
const PORT = "8080";

const orderServiceClient = new OrderServiceClient(
  `${BASE_URL}${PORT}`,
  null,
  {}
);

const pricingClient = new PricingClient(`${BASE_URL}${PORT}`, null, {});

const getProductsClient = new GetProductsServiceClient(
  `${BASE_URL}${PORT}`,
  null,
  {}
);

export { orderServiceClient, pricingClient, getProductsClient };
