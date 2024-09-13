import React, { useState, useEffect, useRef } from "react";
import logo from "../image/logo.png";
import "../main/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cartheader from "./Cartheader";

export default function Header() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  const handleLogout = () => {
    // Xóa thông tin người dùng và điều hướng về trang login
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
            <NavLink to="/login" onClick={isLoggedIn ? handleLogout : null}>
              {isLoggedIn ? (
                <i class="bi bi-box-arrow-right"></i>
              ) : (
                // Hiển thị icon nếu đã đăng nhập
                <i className="bi bi-person"></i> // Hiển thị chữ Login nếu chưa đăng nhập
              )}
            </NavLink>

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
