import React, { useEffect, useState } from "react";
import "../main/Cartheader.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartAsync,
  removeFromCartAsync,
  syncCartFromLocal,
} from "../redux/CartSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Cartheader({ onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [cartlogin, setCartlogin] = useState(() => {
  //   const storedItems = localStorage.getItem("cartlogin");
  //   return storedItems ? JSON.parse(storedItems) : [];
  // });
  // useEffect(() => {
  //   localStorage.setItem("cartlogin", JSON.stringify(cartlogin));
  // }, [cartlogin]);

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
    const isLoggedIn = localStorage.getItem("user"); // Giả sử userToken lưu trạng thái đăng nhập

    if (!isLoggedIn) {
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
          let cartItems = JSON.parse(localStorage.getItem("cartlogin")) || [];
          // Lọc ra những sản phẩm không khớp với productId của sản phẩm cần xóa
          const updatedCartItems = cartItems.filter(
            (cartItem) => cartItem.productId !== item.productId
          );
          // setCartlogin(updatedCartItems);
          // Cập nhật lại localStorage với danh sách sản phẩm đã xóa
          const storedCart = localStorage.setItem(
            "cartlogin",
            JSON.stringify(updatedCartItems)
          );
          toast.info(
            "Product removed. You are not logged in, please log in to continue."
          );
          dispatch(syncCartFromLocal(updatedCartItems));
        }
      });
      // Nếu chưa đăng nhập, xóa dữ liệu trong localStorage

      return;
    }
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
            <NavLink to="/checkout" onClick={onClose} className="btn">
              Check out
            </NavLink>
            <NavLink to="/comparison" onClick={onClose} className="btn">
              Comparison
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
