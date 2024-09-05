import React from "react";
import { useState } from "react";
import "../../main/OurProducts.css";
import Products from "../Products";
export default function Ourproduct() {
  const [items, setItems] = useState(9); // Số lượng sản phẩm ban đầu

  const showMore = () => {
    setItems((prevItems) => prevItems + 4); // Tăng thêm 4 sản phẩm
  };

  return (
    <>
      <div className="Ourproducts">
        <div className="Ourproducts-title">
          <h2>Our Products</h2>
          <Products item={items} />
        </div>
        <div className="but">
          <button onClick={showMore}>Show More</button>
        </div>
      </div>
    </>
  );
}
