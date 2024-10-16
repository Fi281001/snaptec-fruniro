import "../main/Pagination.css";
export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  console.log("totalpage", totalPages);
  console.log("currentPage", currentPage);
  console.log("onPageChange", onPageChange);
  return (
    <>
      <div className="pagination">
        <button
          className="page-item"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous{" "}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "page-item-active" : "page-item"}
          >
            {page}
          </button>
        ))}
        <button
          className="page-item"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
