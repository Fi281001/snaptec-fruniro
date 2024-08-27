import React from "react";
import Rectangle from "./Rectangle.js";
import Filter from "./Filter.js";
import Page from "./Pagination.js";
import "../main/Shop.css";
import Frame from "./Frame.js";
import Shopproducts from "./Shopproducts.js";
export default function Shop() {
  return (
    <div>
      <Rectangle title="Shop" />
      <Filter />
      <div className="block-products">
        <Shopproducts />
        <Page />
      </div>
      <Frame />
    </div>
  );
}
