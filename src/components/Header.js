import React, { useState, useEffect, useRef } from "react";
import logo from "../image/logo.png";
import "../main/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Cartheader from "./Cartheader";

export default function Header() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
  };
  // const handleScroll = () => {
  //   setIsCartVisible(false); // Ẩn giỏ hàng khi cuộn xuống
  // };

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      // window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      // window.removeEventListener("scroll", handleScroll); // Xóa sự kiện cuộn
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [isCartVisible]);

  return (
    <>
      {/* Lớp phủ làm mờ toàn bộ trang */}
      <div className={`overlay ${isCartVisible ? "show" : ""}`} />

      <div className="header">
        <div className="header-nav">
          <div className="logo">
            <img src={logo} alt="" />
            <h2>Funiro</h2>
          </div>

          <div className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/Blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {/* <li>
                
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li> */}
            </ul>
          </div>

          <div className="nav-icon">
            <Link to="/loginregister">
              <i class="bi bi-person"></i>
            </Link>

            <i className="bi bi-search" title="search"></i>
            <i className="bi bi-heart" title="heart"></i>
            <i
              className="bi bi-cart"
              title="cart"
              onClick={toggleCartVisibility}
            ></i>
          </div>
        </div>
        {isCartVisible && (
          <div className="cart-block" ref={cartRef}>
            <Cartheader onClose={toggleCartVisibility} />
          </div>
        )}
      </div>
    </>
  );
}
