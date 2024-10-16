import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { getAuth } from "firebase/auth";
import Rectangle from "./Rectangle.js";
import "../main/Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, clearCartAsync } from "../redux/CartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const handleClearCart = () => {
    dispatch(clearCartAsync());
  };

  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Để hiển thị lỗi

  const SubTotal = cartItems.reduce((total, item) => {
    const priceString = item.pricesale.replace(/\./g, "");
    const priceNumber = parseFloat(priceString.replace(/,/g, "."));
    return total + priceNumber * item.quantity;
  }, 0);

  const formattedSubTotal = SubTotal.toLocaleString("id-ID");
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const user = auth.currentUser;

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];
  const mail = user ? user.email : "";

  const [checkoutData, setCheckoutData] = useState({
    email: mail || "",
    name: mail.split("@")[0] || "",
    products: reversedCartItems,
    subTotal: formattedSubTotal,
    totalQuantity: totalQuantity,
    address: "",
    phone: "",
  });

  useEffect(() => {
    setCheckoutData((prev) => ({
      ...prev,
      address: address,
      phone: phone,
      email: mail || "",
      name: mail.split("@")[0] || "",
      products: reversedCartItems,
      subTotal: formattedSubTotal,
      totalQuantity: totalQuantity,
    }));
  }, [address, phone]);

  const form = useRef();

  // Hàm kiểm tra số điện thoại hợp lệ
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Kiểm tra số điện thoại trước khi gửi
    if (!validatePhone(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return; // Dừng nếu số điện thoại không hợp lệ
    } else {
      setErrorMessage(""); // Xóa thông báo lỗi nếu hợp lệ
    }

    const recipientEmail = "pctrungmagic@gmail.com";
    const productList = checkoutData.products
      .map(
        (item) =>
          `${item.name} x ${item.quantity} - Rs.${parseFloat(
            item.pricesale.replace(/\./g, "").replace(/,/g, ".")
          ).toLocaleString("vi-VN")}`
      )
      .join(", ");

    const templateParams = {
      to_name: "furino",
      from_name: checkoutData.email,
      user_name: checkoutData.name,
      total_quantity: checkoutData.totalQuantity,
      sub_total: checkoutData.subTotal,
      products: productList,
      address: checkoutData.address,
      phone: checkoutData.phone,
      to_email: recipientEmail,
    };

    if (!templateParams.to_email || templateParams.to_email.trim() === "") {
      console.error("Recipient email is undefined");
      return;
    }

    emailjs
      .send(
        "service_g5xet9g",
        "template_6tgulea",
        templateParams,
        "V_ZfxWbQXvfmFZGwY"
      )
      .then(
        () => {
          Swal.fire({
            title:
              "Your order has been placed successfully, please check your email",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(clearCartAsync());
              navigate("/");
            }
          });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div>
      <Rectangle title="Check out" />
      <form ref={form} onSubmit={sendEmail}>
        <div className="container-contact2">
          <h1>Check Out</h1>
          <div className="container-contact__group2">
            <div className="container-contact__group-right2">
              <span className="display-flex">Name: {mail.split("@")[0]}</span>
              <span className="display-flex">
                Email: {user ? user.email : "N/A"}
              </span>

              <span className="display-flex">Address</span>
              <input
                type="text"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
                className="content-input"
              />

              <span className="display-flex">Phone</span>
              <input
                type="text"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your number phone"
                className="content-input"
              />
              {/* Hiển thị lỗi nếu số điện thoại không hợp lệ */}
              {errorMessage && (
                <span style={{ color: "red" }}>{errorMessage}</span>
              )}
            </div>
            <div className="container-contact__group-left2">
              {/* Nội dung hiển thị sản phẩm và tổng giá trị */}
            </div>
          </div>
          <div className="button-div">
            <button type="submit" className="submit">
              Confirm Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
