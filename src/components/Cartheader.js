import React, { useEffect, useState } from "react";
import "../main/Cartheader.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, removeFromCartAsync } from "../redux/CartSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Cartheader({ onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];

  // Tính tổng SubTotal
  const SubTotal = cartItems.reduce((total, item) => {
    const priceString = item.pricesale.replace(/\./g, ""); // Xóa dấu chấm
    const priceNumber = parseFloat(priceString.replace(/,/g, ".")); // Chuyển đổi sang số
    return total + priceNumber * item.quantity;
  }, 0);
  const formattedSubTotal = SubTotal.toLocaleString("vi-VN"); // Định dạng số tiền

  const handleRemove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the product ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      document.querySelector(".overlay").style.display = ""; // Hiện lại overlay sau khi SweetAlert2 tắt
      if (result.isConfirmed) {
        toast.success("Delete successfully");
        dispatch(removeFromCartAsync(item.productId));
      }
    });
  };

  return (
    <>
      <div className="block">
        <div className="cart-header">
          <div className="cart-title">
            <h3>Shopping Cart</h3>
            <i onClick={onClose} className="bi bi-bag-x"></i>
          </div>
          <hr className="cart-title__hr" />
        </div>

        <div className="cart-list">
          {reversedCartItems && reversedCartItems.length > 0 ? (
            reversedCartItems.map((item, index) => {
              // Chuyển đổi pricesale từ chuỗi sang số
              const priceString = item.pricesale.replace(/\./g, "");
              const priceNumber = parseFloat(priceString.replace(/,/g, "."));

              return (
                <div key={index} className="cart-body">
                  <img alt={item.name} src={item.imgSrc} />{" "}
                  {/* Hiển thị hình ảnh sản phẩm */}
                  <div>
                    <span>{item.name}</span> {/* Tên sản phẩm */}
                    <div>
                      <p>{item.quantity}</p> {/* Số lượng sản phẩm */}
                      <p>x</p>
                      <p className="price">
                        Rs.{" "}
                        {(item.quantity * priceNumber).toLocaleString("vi-VN")}
                      </p>{" "}
                      {/* Giá sản phẩm */}
                    </div>
                  </div>
                  <i
                    onClick={() => handleRemove(item)}
                    className="bi bi-x-circle-fill"
                  ></i>{" "}
                  {/* Icon xóa sản phẩm */}
                </div>
              );
            })
          ) : isLoggedIn === false ? (
            <p className="p">Please log in to view your cart.</p>
          ) : (
            <p className="p">No items</p>
          )}
        </div>

        <div className="total-block">
          <div className="total">
            <span className="total-name">Subtotal</span>
            <span className="total-price">Rs. {formattedSubTotal}</span>
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
