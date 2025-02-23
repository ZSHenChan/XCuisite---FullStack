import { getProductsClient } from "@/lib/grpc/xcuisite.Client/grpcClient";
import { ProductsRequest, ProductsResponse } from "@/lib/proto/products_pb";
import { wrapApi } from "@/utils/asyncWrap";
import { productTemplate } from "@/utils/productTemplate";

const metadata = {
  "Content-Type": "application/grpc-web+proto",
  "X-User-Agent": "grpc-web-javascript/0.1",
  "X-Grpc-Web": "1",
};

async function getProducts(request) {
  return new Promise((resolve, reject) => {
    getProductsClient.getProducts(request, metadata, (err, res) => {
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

export async function ApiGetProducts(flavour = "") {
  const request = new ProductsRequest();
  request.setFlavour(flavour);

  const [data, err] = await wrapApi(getProducts(request));

  if (err) {
    return [null, err];
  }

  // Convert each fetched product based on the template
  const modifiedProducts = data.getProductsList().map((product) => ({
    ...productTemplate,
    productName: product.getProductName(),
    id: product.getId(),
    description: product.getDescription(),
    img: product.getImg(),
    thumbnail: product.getThumbnail(),
    imgAlt: product.getImgAlt(),
    ingredients: product.getIngredients(),
    price: product.getPrice(),
  }));

  return [modifiedProducts, null];
}
