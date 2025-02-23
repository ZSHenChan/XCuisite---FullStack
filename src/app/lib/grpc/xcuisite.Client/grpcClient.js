import { OrderServiceClient } from "@/lib/proto/orderService_grpc_web_pb.js";
import { PricingClient } from "@/lib/proto/price_grpc_web_pb";
import { GetProductsServiceClient } from "@/lib/proto/products_grpc_web_pb";
// import { grpc } from "@improbable-eng/grpc-web";

// envoy listens on 8080
const PORT = "8080";

const orderServiceClient = new OrderServiceClient(
  `http://localhost:${PORT}`,
  null,
  {}
);

const pricingClient = new PricingClient(`http://localhost:${PORT}`, null, {});

const getProductsClient = new GetProductsServiceClient(
  `http://localhost:${PORT}`,
  null,
  {}
);

export { orderServiceClient, pricingClient, getProductsClient };
