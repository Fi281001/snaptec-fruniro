import React, { useState, useEffect } from "react";
import Rectangle from "./Rectangle.js";
import Filter from "./Filter.js";
import Page from "./Pagination.js";
import "../main/Shop.css";
import Frame from "./Frame.js";
import Products from "./Products.js";

export default function Shop() {
  const [productLength, setProductLength] = useState(0);
  const string = productLength;
  const [currentPage, setCurrentPage] = useState(1);
  const handleLengthChange = (length) => {
    setProductLength(length - 1); // Cập nhật length từ Products
  };

  const handleShowItemsChange = (item) => {
    setItemsToShow(item);
  };
  const handleSortChange = (order) => {
    setSortOrder(order); // Cập nhật cách sắp xếp
  };

  // Lấy các giá trị từ localStorage khi load trang
  const [itemsToShow, setItemsToShow] = useState(() => {
    return localStorage.getItem("itemsToShow")
      ? parseInt(localStorage.getItem("itemsToShow"))
      : 12;
  });

  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "A-Z";
  });

  useEffect(() => {
    localStorage.setItem("itemsToShow", itemsToShow);
  }, [itemsToShow]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  const totalPages = Math.ceil(productLength / itemsToShow);

  // Get products for the current page
  const handlePageChange = (page) => {
    setCurrentPage(page); // Set current page
  };

  const [minPrice, setMinPrice] = useState(150000);
  const [maxPrice, setMaxPrice] = useState(8000000);
  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleDelete = () => {
    setMinPrice(150000);
    setMaxPrice(8000000);
  };
  return (
    <div>
      <Rectangle title="Shop" />
      <Filter
        length={productLength}
        onShowItemsChange={handleShowItemsChange}
        onSortChange={handleSortChange}
        itemsToShow2={itemsToShow}
        sortOrder={sortOrder}
        minValue={minPrice}
        maxValue={maxPrice}
        onPriceChange={handlePriceChange}
      />
      <div className="center-container">
        {!(minPrice === 150000 && maxPrice === 8000000) && (
          <div className="chip-filter">
            <div>
              <span>price</span>
              <p>
                {minPrice} - {maxPrice}
              </p>
            </div>
            <span
              onClick={() => {
                handleDelete();
              }}
            >
              x
            </span>{" "}
            {/* Dấu "x" để đóng hoặc xóa */}
          </div>
        )}
      </div>
      <div className="block-products">
        <div className="item">
          <Products
            item={itemsToShow}
            currentPage={currentPage}
            onLengthChange={handleLengthChange}
            sortOrder={sortOrder}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Frame />
    </div>
  );
}
