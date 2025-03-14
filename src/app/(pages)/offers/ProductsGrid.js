"use client";

import styles from "./offers.module.scss";

import { SpinnerOrange } from "@/components/Feedback/Spinner";
// import ProductCard from "@/components/Card/ProductCard";
import { Card } from "./Card/Card";
import { InfoHeading } from "@/components/Feedback/FeedbackHeading";

import { useState, useEffect, useContext } from "react";
import { Overlay } from "./Card/Overlay";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import { ApiGetProducts } from "@/api/handleGetProducts";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalHidden, setModalHidden] = useState(true);
  const [modalProduct, setModalProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const [fetchedProducts, err] = await ApiGetProducts();
      setLoading(false);
      if (err) {
        toast.error("Error fetching products!");
        return;
      }
      setProducts(fetchedProducts);
      // toast.success("Products fetched successfully!");
    };

    fetchProducts();
  }, []);

  if (loading) return <SpinnerOrange size="200px" />;

  if (!loading && products.length === 0)
    return (
      <InfoHeading>
        No products available right now :\ Please keep updated!
      </InfoHeading>
    );

  const handleCloseModal = () => {
    setModalProduct({});
    setModalHidden(true);
  };

  const handleSelectProduct = (product) => {
    setModalProduct(product);
    setModalHidden(false);
  };

  const handleUpdateModalProduct = (product) => {
    setModalProduct(product);
  };

  return (
    <>
      <Overlay hidden={modalHidden} onHideModal={handleCloseModal} />
      <ul className={styles["product-grid"]}>
        {products?.map((product) => (
          <Card
            key={product.id}
            product={product}
            updateModalProduct={handleUpdateModalProduct}
            onHideModal={handleCloseModal}
            onShowModal={() => handleSelectProduct(product)}
            isSelected={modalProduct.id === product.id && !modalHidden}
          />
        ))}
      </ul>
    </>
  );
}
