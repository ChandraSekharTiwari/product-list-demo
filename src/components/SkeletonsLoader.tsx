import React from "react";
import styles from "./SkeletonsLoader.module.scss";

type Props = {
  count: number;
};

const ProductSkeletonsLoader: React.FC<Props> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={styles.imagePlaceholder}></div>
          <h3>&nbsp;</h3>
          <p></p>
        </div>
      ))}
    </>
  );
};

export default ProductSkeletonsLoader;
