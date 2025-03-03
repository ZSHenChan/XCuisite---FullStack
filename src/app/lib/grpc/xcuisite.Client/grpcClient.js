import { OrderServiceClient } from "@/lib/proto/orderService_grpc_web_pb.js";
import { PricingClient } from "@/lib/proto/price_grpc_web_pb";
import { GetProductsServiceClient } from "@/lib/proto/products_grpc_web_pb";
// import { grpc } from "@improbable-eng/grpc-web";

// envoy listens on 8080
// const BACKEND_BASE_URL = "http://localhost:";
// const PORT = "8080";
const BACKEND_BASE_URL = "http://20.212.41.187:";
const PORT = "8080";

const orderServiceClient = new OrderServiceClient(
  `${BACKEND_BASE_URL}${PORT}`,
  null,
  {}
);

const pricingClient = new PricingClient(`${BACKEND_BASE_URL}${PORT}`, null, {});

const getProductsClient = new GetProductsServiceClient(
  `${BACKEND_BASE_URL}${PORT}`,
  null,
  {}
);

export { orderServiceClient, pricingClient, getProductsClient };
