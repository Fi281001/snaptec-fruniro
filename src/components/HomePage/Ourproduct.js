import React from "react";
import "../../main/OurProducts.css";
import Products from "../Products";
export default function Ourproduct() {
  return (
    <>
      <div className="Ourproducts">
        <div className="Ourproducts-title">
          <h2>Our Products</h2>
          <Products />
        </div>
        <div className="but">
          <button>Show More</button>
        </div>
      </div>
    </>
  );
}
