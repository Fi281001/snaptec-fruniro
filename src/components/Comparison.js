import React from "react";
import "../main/Comparison.css";
import { useSelector } from "react-redux";
export default function Comparison() {
  const cartItems = useSelector((state) => state.cart.cart);
  return (
    <div className="compare-cart">
      <h2>So Sánh Các Sản Phẩm</h2>
      <table className="compare-table">
        <thead>
          <tr>
            <th></th> {/* Ô trống cho tiêu đề sản phẩm */}
            {cartItems.map((item, index) => (
              <th key={index}>
                <img src={item.imgSrc} alt={item.name} className="item-image" />
                <div>{item.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Giá</td>
            {cartItems.map((item, index) => (
              <td key={index}>{item.pricesale}</td>
            ))}
          </tr>
          <tr>
            <td>Size</td>
            {cartItems.map((item, index) => (
              <td key={index}>{item.selectedSize}</td>
            ))}
          </tr>{" "}
          <tr>
            <td>QƯuantity</td>
            {cartItems.map((item, index) => (
              <td key={index}>{item.quantity}</td>
            ))}
          </tr>{" "}
          <tr>
            <td>Màu</td>
            {cartItems.map((item, index) => (
              <td key={index}>{item.selectedColor}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
