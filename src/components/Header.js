import React from "react";
import logo from "../image/logo.png";
import "../main/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="header">
        <div className="header-nav">
          <div className="logo">
            <img src={logo} />
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
            </ul>
          </div>

          <div className="nav-icon">
            <i class="bi bi-person-fill-exclamation"></i>
            <i class="bi bi-search" title="search"></i>
            <i class="bi bi-heart" title="heart"></i>
            <i className="bi bi-cart" title="cart"></i>
          </div>
        </div>
      </div>
    </>
  );
}
