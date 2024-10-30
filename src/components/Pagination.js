import { useState, useEffect } from "react";
import "../main/Pagination.css";
export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {totalPages > 1 && (
        <button
          className="page-item"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      )}

      {/* Hiển thị số trang */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "page-item-active" : "page-item"}
        >
          {page}
        </button>
      ))}

      {/* Hiển thị nút "Next" chỉ khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <button
          className="page-item"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      )}
    </div>
  );
}
