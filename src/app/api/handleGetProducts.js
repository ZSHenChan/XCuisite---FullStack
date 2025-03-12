// import { getProductsClient } from "@/lib/grpc/xcuisite.Client/grpcClient";
// import { ProductsRequest, ProductsResponse } from "@/lib/proto/products_pb";
import { wrapApi } from "@/utils/asyncWrap";
import { productTemplate } from "@/utils/productTemplate";

import { env } from "@/data/env/client";

// const metadata = {
//   "Content-Type": "application/grpc-web+proto",
//   "X-User-Agent": "grpc-web-javascript/0.1",
//   "X-Grpc-Web": "1",
// };

const OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

async function getProducts(options = OPTIONS, ids = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/Products${
          ids.length == 0 ? "" : `?ids=${ids.join(",")}`
        }`,
        options
      );

      if (!response.ok) {
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

export async function ApiGetProducts(flavour = "", ids = []) {
  // const request = new ProductsRequest();
  const request = {};
  request.flavour = flavour;

  const [data, err] = await wrapApi(getProducts(request, ids));

  if (err) {
    return [null, err];
  }

  // Convert each fetched product based on the template
  // const modifiedProducts = data.getProductsList().map((product) => ({
  //   ...productTemplate,
  //   productName: product.getProductName(),
  //   id: product.getId(),
  //   description: product.getDescription(),
  //   img: product.getImg(),
  //   thumbnail: product.getThumbnail(),
  //   imgAlt: product.getImgAlt(),
  //   ingredients: product.getIngredients(),
  //   price: product.getPrice(),
  // }));

  return [data, null];
}
