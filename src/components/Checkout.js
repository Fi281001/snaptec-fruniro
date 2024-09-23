import React, { useEffect } from "react";

import { getAuth } from "firebase/auth";
import Rectangle from "./Rectangle.js";
import "../main/Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, removeFromCartAsync } from "../redux/CartSlice";
export default function Checkout() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store

  const SubTotal = cartItems.reduce((total, item) => {
    const priceString = item.pricesale.replace(/\./g, ""); // Xóa dấu chấm
    const priceNumber = parseFloat(priceString.replace(/,/g, ".")); // Chuyển đổi sang số
    return total + priceNumber * item.quantity;
  }, 0);
  const formattedSubTotal = SubTotal.toLocaleString("vi-VN"); // Định dạng số tiền
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const user = auth.currentUser;

  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
  }, [dispatch]);
  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];
  const mail = user ? user.email : "";
  return (
    <div>
      <Rectangle title="Check out" />
      <div className="container-contact2">
        <h1>Check Out</h1>
        <div className="container-contact__group2">
          <div className="container-contact__group-right2">
            <span>Your name: {mail.split("@")[0]}</span>

            <span>Email Address: {user ? user.email : "N/A"}</span>

            <span>Address</span>
            <input
              type="text"
              required
              placeholder="Your Address"
              className="content-input"
            ></input>
            <span>Phone</span>
            <input
              type="text"
              required
              placeholder="Your number phone"
              className="content-input"
            ></input>
          </div>
          <div className="container-contact__group-left2">
            <div className="container-right2">
              <div className="container-right__cart-totals2">Cart Totals</div>
              <h3 style={{ marginBottom: "10px" }}>Product</h3>
              {reversedCartItems.map((item, index) => (
                <p style={{ fontSize: "20px" }} key={item.id}>
                  {item.name} x {item.quantity} x Rs.
                  {(function () {
                    const priceString = item.pricesale.replace(/\./g, "");
                    const priceNumber = parseFloat(
                      priceString.replace(/,/g, ".")
                    );
                    return priceNumber.toLocaleString("vi-VN");
                  })()}
                </p>
              ))}
              <div className="container-right__display-flex2">
                <span>Total Quantity</span>
                <p>{totalQuantity}</p>
              </div>
              <div className="container-right__display-flex2">
                <span>SubTotal</span>
                <p className="container-right__p2">Rs.{formattedSubTotal} </p>
              </div>
              <div className="container-right__w-1002"></div>
            </div>
          </div>
        </div>
        <div className="button-div">
          <button type="button" className="submit">
            Confirm Application
          </button>
        </div>
      </div>
    </div>
  );
}
