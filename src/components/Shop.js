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
  // const [itemsToShow, setItemsToShow] = useState(12);
  // const [sortOrder, setSortOrder] = useState("A-Z");

  const handleLengthChange = (length) => {
    setProductLength(length); // Cập nhật length từ Products
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

  return (
    <div>
      <Rectangle title="Shop" />
      <Filter
        length={productLength}
        onShowItemsChange={handleShowItemsChange}
        onSortChange={handleSortChange}
        itemsToShow2={itemsToShow}
        sortOrder={sortOrder}
      />
      <div className="block-products">
        <div className="item">
          <Products
            item={itemsToShow}
            onLengthChange={handleLengthChange}
            sortOrder={sortOrder}
          />
        </div>
        <Page />
      </div>
      <Frame />
    </div>
  );
}
