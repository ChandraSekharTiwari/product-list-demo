import React, { ChangeEvent, useEffect, useMemo } from "react";
import styles from "./ProductsPage.module.scss";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import ProductSkeletonsLoader from "../components/SkeletonsLoader";
import PaginationFooter from "../components/PaginationFooter";
import { useProductsContext } from "../context/ProductPageContext";

const ProductsPage: React.FC = () => {
  const { state, dispatch } = useProductsContext();
  const {
    products,
    isLoading,
    error,
    searchTerm,
    selectedCategory,
    currentPage,
    pageSize,
  } = state;

  useEffect(() => {
    try {
      dispatch({ type: "FETCH_IN_PROGRESS" });
      const loadProducts = async () => {
        const allProducts = await fetchProducts();
        dispatch({ type: "FETCH_SUCCESS", products: allProducts });
      };
      loadProducts();
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", error: err.message });
    }
  }, [dispatch]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH", term: e.target.value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_CATEGORY", category: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: "SET_PAGE", page: 1 });
  }, [searchTerm, selectedCategory, dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const { title, category } = p;
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  return (
    <div className={styles.container}>
      <ProductSearch
        categories={categories}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <div className={styles.productsGrid}>
        {isLoading ? (
          <ProductSkeletonsLoader count={pageSize} />
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => <ProductCard product={product} />)
        ) : (
          <div>{error || "No products found!"}</div>
        )}
      </div>
      <PaginationFooter
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={Math.ceil(filteredProducts.length / pageSize)}
        onPageSizeChange={(pageSize) =>
          dispatch({ type: "SET_PAGE_SIZE", pageSize })
        }
        onPageChange={(page) => dispatch({ type: "SET_PAGE", page })}
      />
    </div>
  );
};

export default ProductsPage;
