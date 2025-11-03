import React from "react";
import styles from "./ProductSearch.module.scss";
import { debounce } from "../utils";

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
  const [searchInput, setSearchInput] = React.useState(searchTerm);
  const debouncedHandleSearchChange = React.useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e),
        300
      ),
    [handleSearchChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedHandleSearchChange(e);
  };

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleInputChange}
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
