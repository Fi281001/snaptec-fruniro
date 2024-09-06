import React from "react";
import { useState } from "react";
import "../../main/OurProducts.css";
import Products from "../Products";
export default function Ourproduct() {
  const [items, setItems] = useState(9); // Số lượng sản phẩm ban đầu
  const [productLength, setProductLength] = useState(0);
  const showMore = () => {
    setItems((prevItems) => prevItems + 4); // Tăng thêm 4 sản phẩm
  };
  const handleLengthChange = (length) => {
    setProductLength(length); // Cập nhật length từ Products
  };

  const allItemsDisplayed = items >= productLength;

  return (
    <>
      <div className="Ourproducts">
        <div className="Ourproducts-title">
          <h2>Our Products</h2>
          <Products item={items} onLengthChange={handleLengthChange} />
        </div>
        <div className="but">
          <button
            onClick={showMore}
            style={{
              opacity: allItemsDisplayed ? 0.5 : 1, // Làm mờ nút nếu đã hết sản phẩm
              cursor: allItemsDisplayed ? "not-allowed" : "pointer",
            }}
          >
            {allItemsDisplayed ? "Out of product" : "Show More"}
          </button>
        </div>
      </div>
    </>
  );
}
