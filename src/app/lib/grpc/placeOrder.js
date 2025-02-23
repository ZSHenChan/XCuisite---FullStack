import DummyRequest from "./dummyRequest";
import { orderServiceClient } from "@/lib/grpc/xcuisite.Client/grpcClient";
import { OrderResponse } from "@/lib/proto/orderService_pb";

export default async function PlaceOrder() {
  const metadata = {
    "Content-Type": "application/grpc-web+proto",
    "X-User-Agent": "grpc-web-javascript/0.1",
    "X-Grpc-Web": "1",
  };

  try {
    const req = new DummyRequest();
    var response = new OrderResponse();
    await orderServiceClient.placeOrder(req, metadata, (err, res) => {
      if (err) {
        console.error(`Error code: ${err.code}`);
        console.error(`Error: ${err.details}`);
        return;
      }
      response = res;
      console.log(`Order Placed successfully`);
      console.log(response.getOrderId());
      console.log("Confirmation message:", response.getMessage());
    });
  } catch (err) {
    console.error(err);
  }
}
