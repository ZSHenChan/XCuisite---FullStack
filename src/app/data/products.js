const product0 = {
  productName: "Strawberry",
  id: 0,
  description: "Strawberry Beast",
  img: "/images/products/strawberry-indulgence.jpg",
  thumbnail: "/images/products/strawberry-indulgence_tn.jpg",
  imgAlt: "Strawberry",
  ingredients: "strawberry",
  price: "2.99",
};
const product1 = {
  productName: "Hazelnut",
  id: 1,
  description: "Nuts Kraze",
  img: "/images/products/hazelnut.jpg",
  thumbnail: "/images/products/hazelnut_tn.jpg",
  imgAlt: "Hazelnut Doughnut",
  ingredients: "sugar",
  price: "1.99",
};
const product2 = {
  productName: "Raspberry",
  id: 2,
  description: "Stay Pretty",
  img: "/images/products/raspberry.jpg",
  thumbnail: "/images/products/raspberry_tn.jpg",
  imgAlt: "raspberry doughnut",
  ingredients: "sugar",
  price: "2.49",
};
const product3 = {
  productName: "Lore Schodts",
  id: 3,
  description: "Assorted Caramel",
  img: "images/products/caramel.jpg",
  thumbnail: "images/products/caramel_tn.jpg",
  imgAlt: "Caramel icing doughnut",
  ingredients: "caramel",
  price: "1.99",
};
const product4 = {
  productName: "Matcha Deluxe",
  id: 4,
  description: "Matcha Icing",
  img: "images/products/matcha.jpg",
  thumbnail: "images/products/matcha_tn.jpg",
  imgAlt: "Match icing doughnut",
  ingredients: "matcha",
  price: "1.99",
};
const product5 = {
  productName: "Dark Forest",
  id: 5,
  description: "Dark Chocolate",
  img: "images/products/dark-chocolate.jpg",
  thumbnail: "images/products/dark-chocolate_tn.jpg",
  imgAlt: "Dark Forest doughnut",
  ingredients: "98% chocolate",
  price: "2.49",
};
const product6 = {
  productName: "Towfuqi",
  id: 6,
  description: "Colourful Carade",
  img: "images/products/towfiqu.jpg",
  thumbnail: "images/products/towfiqu_tn.jpg",
  imgAlt: "doughnut with colourful sprinkles",
  ingredients: "sugar",
  price: "1.49",
};
const product7 = {
  productName: "Classic Schodts",
  id: 7,
  description: "Classic. Not Basic",
  img: "images/products/classic-choc.jpg",
  thumbnail: "/images/products/classic-choc_tn.jpg",
  imgAlt: "classic chocolate doughnut",
  ingredients: "sugar",
  price: "1.99",
};
const product8 = {
  productName: "Black Magic",
  id: 8,
  description: "Avada Kedavra",
  img: "/images/products/black-magic.jpg",
  thumbnail: "/images/products/black-magic_tn.jpg",
  imgAlt: "dark chocolate doughnut with self-made cream",
  ingredients: "sugar",
  price: "2.49",
};
const product9 = {
  productName: "Oreo Bonanza",
  id: 9,
  description: "Kids Favourite",
  img: "/images/products/oreo.jpg",
  thumbnail: "/images/products/oreo_tn.jpg",
  imgAlt: "oreo doughnut",
  ingredients: "sugar",
  price: "2.49",
};
const product10 = {
  productName: "Banana Indulge",
  id: 10,
  description: "Natural Sweetness",
  img: "/images/products/banana.jpg",
  thumbnail: "/images/products/banana_tn.jpg",
  imgAlt: "banana doughnut",
  ingredients: "sugar",
  price: "2.49",
};
const product11 = {
  productName: "Scary Choco",
  id: 11,
  description: "Halloween Special",
  img: "/images/products/halloween-choc.jpg",
  thumbnail: "/images/products/halloween-choc_tn.jpg",
  imgAlt: "halloween special doughnut",
  ingredients: "sugar",
  price: "2.49",
};

const store1 = {
  storeName: "Paragon Shopping Centre",
  street: "290 Orchard Rd",
  address: "Singapore 238859",
  tel: "23456789",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.30403, 103.83605],
};
const store2 = {
  storeName: "Guoco Tower - Tanjung Pagar",
  street: "1 Wallich St",
  address: "Singapore 078881",
  tel: "23458790",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.2770566482056793, 103.84585313414046],
};
const store3 = {
  storeName: "Bugis+",
  street: "201 Victoria St",
  address: "Singapore 188067",
  tel: "23458901",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.2997336007222613, 103.854226647566],
};
const store4 = {
  storeName: "Jurong Point",
  street: "1 Jurong West Central 2",
  address: "Singapore 648886",
  tel: "23451098",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.3407739649436974, 103.70694421914453],
};
const store5 = {
  storeName: "Tiong Bahru Plaza",
  street: "302 Tiong Bahru Rd",
  address: "Singapore 168732",
  tel: "234558790",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.2868035571831067, 103.82717517005327],
};
const store6 = {
  storeName: "The Shoppes - Marina Bay Sands",
  street: "8 Bayfront Ave",
  address: "Singapore 018955",
  tel: "23451579",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.2843686280505875, 103.85958489514043],
};
const store7 = {
  storeName: "Sentosa",
  street: "26 Sentosa Gateway",
  address: "The Forum 098138",
  tel: "23450021",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.2550589944561685, 103.82169877838415],
};
const store8 = {
  storeName: "Gain City - Ang Mo Kio",
  street: "8 Ang Mo Kio",
  address: "Singapore 569500",
  tel: "23458890",
  operateTime: "10:00AM - 9:00PM Daily",
  coords: [1.3722806631395434, 103.86485276934508],
};

export const stores = [
  store1,
  store2,
  store3,
  store4,
  store5,
  store6,
  store7,
  store8,
];

export const filterStoreByName = function (storeName) {
  return stores.filter((store) => store.storeName === storeName);
};

export const products = [
  product0,
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
];

export const state = {
  curSlide: 0,
  modalProduct: null,
  cart: {
    totalQty: 0,
    items: [],
  },
};
const persistCart = function () {
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

export const addToCart = function (qty) {
  state.cart.totalQty += +qty;
  const targetID = state.cart.items.findIndex(
    (item) => item.product.id === state.modalProduct.id
  );
  if (targetID >= 0) {
    state.cart.items[targetID].qty += +qty;
  } else {
    state.cart.items.push({ product: state.modalProduct, qty });
  }
  persistCart();
};

export const emptyCart = function () {
  localStorage.clear();
  state.cart.totalQty = 0;
  state.cart.items = [];
};

// const init = function () {
//   const localStorageItems = localStorage.getItem("cart");
//   if (localStorageItems) state.cart = JSON.parse(localStorageItems);
// };

// init();
