import React, { useState, useEffect, useRef } from "react";
import logo from "../image/logo.png";
import "../main/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cartheader from "./Cartheader";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity, getCartAsync } from "../redux/CartSlice";
import { getAuth, signOut } from "firebase/auth"; // Import signOut để đăng xuất
import { toast } from "react-toastify";
import Drawer from "react-modern-drawer";
export default function Header() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const navigate = useNavigate();
  const auth = getAuth();

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

  // Hàm để xóa tất cả cookies
  const clearCookies = () => {
    const cookies = document.cookie.split(";"); // Tách từng cookie
    const path = window.location.pathname; // Lấy đường dẫn hiện tại

    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim(); // Lấy tên cookie
      // Xóa cookie bằng cách thiết lập thời gian hết hạn là quá khứ và chỉ định path hiện tại
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
    }
  };

  //Hàm xóa data google khỏi firebase
  const handleLogout = async () => {
    try {
      // Đăng xuất khỏi Firebase Authentication
      await signOut(auth);

      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem("users");
      localStorage.clear();
      // Xóa tất cả cookies
      clearCookies();
      // Xóa trạng thái đăng nhập
      setIsLoggedIn(false);

      // Điều hướng người dùng về trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout: " + error.message);
    }
  };
  //when not logged in

  const user = localStorage.getItem("user");

  const totalQuantity2 = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // drawer
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Lớp phủ làm mờ toàn bộ trang */}
      <div className={`overlay ${isCartVisible ? "show" : ""}`} />

      <div className="header">
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bla bla bla"
        >
          <div>
            {" "}
            <div className="logo2">
              <img src={logo} alt="" />
              <h2>Funiro</h2>
            </div>
            <div className="nav2">
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
                <li>
                  <NavLink
                    to="/login"
                    onClick={isLoggedIn ? handleLogout : null}
                  >
                    {isLoggedIn ? (
                      <i className="bi bi-box-arrow-right">Log out</i>
                    ) : (
                      // Hiển thị icon nếu đã đăng nhập
                      <i className="bi bi-person">Login</i> // Hiển thị chữ Login nếu chưa đăng nhập
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Drawer>
        <div className="header-nav">
          <div className="lg">
            <div className="logo">
              <span className="menu">
                {" "}
                <i
                  className="bi bi-list"
                  onClick={toggleDrawer}
                  title="menu"
                ></i>
              </span>
              <img src={logo} alt="" />
              <h2>Funiro</h2>
            </div>
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
            </ul>
          </div>

          <div className="nav-icon">
            <div class="login-icon">
              <NavLink to="/login" onClick={isLoggedIn ? handleLogout : null}>
                {isLoggedIn ? (
                  <i className="bi bi-box-arrow-right"></i>
                ) : (
                  // Hiển thị icon nếu đã đăng nhập
                  <i className="bi bi-person"></i> // Hiển thị chữ Login nếu chưa đăng nhập
                )}
              </NavLink>
            </div>
            <i className="bi bi-search" title="search"></i>
            <i className="bi bi-heart" title="heart"></i>

            <div className="cart-icon-container">
              <i
                className="bi bi-cart"
                title="cart"
                onClick={toggleCartVisibility}
              ></i>
              <span className="cart-badge">
                {" "}
                {user ? totalQuantity2 : totalQuantity}
              </span>
              {/* <span className="cart-badge"> {totalQuantity2}</span> */}
            </div>
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
