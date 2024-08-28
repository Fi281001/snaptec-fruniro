import React from "react";
import "../../main/OurProducts.css";
import Products from "../Products";
export default function Ourproduct() {
  return (
    <>
      <div className="Ourproducts">
        <div className="Ourproducts-title">
          <h2>Our Products</h2>
        </div>
        <Products item={8}/>
      </div>
    </>
  );
}
