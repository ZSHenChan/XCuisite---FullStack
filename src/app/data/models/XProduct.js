// XProduct.js
export class XProduct {
  constructor(
    id,
    productName,
    description,
    img,
    thumbnail,
    imgAlt,
    ingredients,
    price,
    priceId
  ) {
    this.Id = id;
    this.ProductName = productName;
    this.Description = description;
    this.Img = img;
    this.Thumbnail = thumbnail;
    this.ImgAlt = imgAlt;
    this.Ingredients = ingredients;
    this.Price = price;
    this.PriceId = priceId;
  }
}
