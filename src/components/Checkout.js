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
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const SubTotal = cartItems.reduce((total, item) => {
    const priceString = item.pricesale.replace(/\./g, ""); // Xóa dấu chấm
    const priceNumber = parseFloat(priceString.replace(/,/g, ".")); // Chuyển đổi sang số
    return total + priceNumber * item.quantity;
  }, 0);
  const formattedSubTotal = SubTotal.toLocaleString("id-ID"); // Định dạng số tiền
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const user = auth.currentUser;

  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
  }, [dispatch]);
  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];
  const mail = user ? user.email : "";

  const [checkoutData, setCheckoutData] = useState({
    email: mail || "", // Lưu email
    name: mail.split("@")[0] || "", // Lưu tên
    products: reversedCartItems, // Lưu danh sách sản phẩm
    subTotal: formattedSubTotal, // Lưu tổng giá trị sản phẩm
    totalQuantity: totalQuantity, // Lưu tổng số lượng sản phẩm
    address: "", // Lưu địa chỉ
    phone: "", // Lưu số điện thoại
  });

  // Sử dụng useEffect để cập nhật checkoutData mỗi khi có sự thay đổi
  useEffect(() => {
    setCheckoutData((prev) => ({
      ...prev,
      address: address,
      phone: phone,
      email: mail || "", // Lưu email
      name: mail.split("@")[0] || "", // Lưu tên
      products: reversedCartItems, // Lưu danh sách sản phẩm
      subTotal: formattedSubTotal, // Lưu tổng giá trị sản phẩm
      totalQuantity: totalQuantity, // Lưu tổng số lượng sản phẩm
    }));
  }, [address, phone]);
  console.log("checkout", checkoutData);

  // send email
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
      total_quantity: checkoutData.totalQuantity, // Tổng số lượng sản phẩm
      sub_total: checkoutData.subTotal, // Tổng giá trị đơn hàng
      products: productList, // Danh sách sản phẩm
      address: checkoutData.address, // Địa chỉ giao hàng
      phone: checkoutData.phone, // Số điện thoại
      to_email: recipientEmail,
    };

    // Kiểm tra nếu địa chỉ email người nhận bị undefined
    if (!templateParams.to_email || templateParams.to_email.trim() === "") {
      console.error("Recipient email is undefined");
      return; // Dừng nếu không có địa chỉ email
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
          console.log("SUCCESS!");
          Swal.fire({
            title:
              "Your order has been placed successfully, please check your email",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // Gọi action để xóa giỏ hàng
              dispatch(clearCartAsync());

              // Chuyển hướng về trang home
              navigate("/"); // Đường dẫn trang home, điều chỉnh nếu cần
            }
          });
        },
        (error) => {
          console.log("FAILED...", error);
          console.log("FAILED...", templateParams);
        }
      );
  };

  console.log("cart", cartItems);

  return (
    <div>
      <Rectangle title="Check out" />
      <form ref={form} onSubmit={sendEmail}>
        {" "}
        {/* Sử dụng ref ở đây */}
        <div className="container-contact2">
          <h1>Check Out</h1>
          <div className="container-contact__group2">
            <div className="container-contact__group-right2">
              <span>Name: {mail.split("@")[0]}</span>
              <span>Email Address: {user ? user.email : "N/A"}</span>

              <span>Address</span>
              <input
                type="text"
                name="address" // Đặt name cho input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
                className="content-input"
              />

              <span>Phone</span>
              <input
                type="text"
                name="phone" // Đặt name cho input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your number phone"
                className="content-input"
              />
            </div>
            <div className="container-contact__group-left2">
              <div className="container-right2">
                <div className="container-right__cart-totals2">Cart Totals</div>
                <h3 style={{ marginBottom: "10px" }}>Products</h3>
                {reversedCartItems.map((item, index) => (
                  <p style={{ fontSize: "20px", color: "coral" }} key={item.id}>
                    {item.name} x {item.quantity} x Rs.
                    {(function () {
                      const priceString = item.pricesale.replace(/\./g, "");
                      const priceNumber = parseFloat(
                        priceString.replace(/,/g, ".")
                      );
                      return priceNumber.toLocaleString("vi-VN");
                    })()}{" "}
                    {item.selectedColor} and {item.selectedSize}
                  </p>
                ))}
                <div className="container-right__display-flex2">
                  <span>Total Quantity</span>
                  <p>{totalQuantity}</p>
                </div>
                <div className="container-right__display-flex2">
                  <span>SubTotal</span>
                  <p className="container-right__p2">Rs.{formattedSubTotal}</p>
                </div>
                <div className="container-right__w-1002"></div>
              </div>
            </div>
          </div>
          <div className="button-div">
            <button type="submit" className="submit">
              {" "}
              {/* Đổi type thành submit */}
              Confirm Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
