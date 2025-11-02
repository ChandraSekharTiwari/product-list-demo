import React from "react";
import styles from "./ProductSearch.module.scss";

type Props = {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const ProductSearch: React.FC<Props> = ({
  searchTerm,
  handleSearchChange,
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchBox}
      />

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className={styles.dropdown}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSearch;
