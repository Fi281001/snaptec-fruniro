import React, { useEffect, useState } from "react";
import "../main/Cartheader.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync } from "../redux/CartSlice";
export default function Cartheader({ onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra người dùng có tồn tại trong localStorage không
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];

  return (
    <>
      <div className="block">
        <div className="cart-header">
          <div className="cart-title">
            <h3>Shopping Cart</h3>
            <i onClick={onClose} class="bi bi-bag-x"></i>
          </div>
          <hr className="cart-title__hr" />
        </div>

        <div className="cart-list">
          {reversedCartItems && reversedCartItems.length > 0 ? (
            reversedCartItems.map((item, index) => (
              <div key={index} className="cart-body">
                <img alt={item.name} src={item.imgSrc} />{" "}
                {/* Hiển thị hình ảnh sản phẩm */}
                <div>
                  <span>{item.name}</span> {/* Tên sản phẩm */}
                  <div>
                    <p>{item.quantity}</p> {/* Số lượng sản phẩm */}
                    <p>x</p>
                    <p className="price">Rs. {item.price}</p>{" "}
                    {/* Giá sản phẩm */}
                  </div>
                </div>
                <i className="bi bi-x-circle-fill"></i>{" "}
                {/* Icon xóa sản phẩm */}
              </div>
            ))
          ) : isLoggedIn === false ? (
            <p className="p">Please log in to view your cart.</p>
          ) : (
            <p className="p">No items</p>
          )}
        </div>

        <div className="total-block">
          {" "}
          <div className="total">
            <span className="total-name">Subtotal</span>
            <span className="total-price">Rs. 520,000.00</span>
          </div>
          <hr className="cart-title__hr" />
          <div className="cart-buttons">
            <NavLink to="/cart" onClick={onClose} className="btn">
              Cart
            </NavLink>
            <button className="btn">Checkout</button>
            <button className="btn ">Comparison</button>
          </div>
        </div>
      </div>
    </>
  );
}
