import React from "react";
import styles from "./PaginationFooter.module.scss";

interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalPages <= 1) return <div className={styles.footerPlaceholder}></div>;

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(pageSize / 2));
    let end = start + pageSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - pageSize + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <div className={styles.footerContainer}>
      <div>
        <label htmlFor="itemsPerPageSelect">Items per page:&nbsp;</label>
        <select
          id="itemsPerPageSelect"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className={styles.paginationFooter}>
        <button
          className={styles.navButton}
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          ‹ Prev
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.navButton}
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next ›
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
