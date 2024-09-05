import React from "react";
import Rectangle from "./Rectangle.js";
import Filter from "./Filter.js";
import Page from "./Pagination.js";
import "../main/Shop.css";
import Frame from "./Frame.js";

import Products from "./Products.js";
export default function Shop() {
  return (
    <div>
      <Rectangle title="Shop" />
      <Filter />
      <div className="block-products">
        <div className="item">
          <Products />
        </div>
        <Page />
      </div>
      <Frame />
    </div>
  );
}
