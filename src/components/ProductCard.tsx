import React from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../api/productApi";

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, title, price, image } = product;
  return (
    <div key={id} className={styles.productCard}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
