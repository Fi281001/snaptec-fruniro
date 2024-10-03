import React, { useState } from "react";
import Rectangle from "./Rectangle.js";
import Filter from "./Filter.js";
import Page from "./Pagination.js";
import "../main/Shop.css";
import Frame from "./Frame.js";

import Products from "./Products.js";
export default function Shop() {
  const [productLength, setProductLength] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(12);
  const [sortOrder, setSortOrder] = useState("default");
  const handleLengthChange = (length) => {
    setProductLength(length); // Cập nhật length từ Products
  };

  const handleShowItemsChange = (value) => {
    setItemsToShow(value);
  };
  return (
    <div>
      <Rectangle title="Shop" />
      <Filter
        length={productLength}
        onShowItemsChange={handleShowItemsChange}
        onSortChange={handleShowItemsChange}
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
