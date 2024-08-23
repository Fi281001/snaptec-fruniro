import React from "react";
import logo from "../image/logo.png";
import "../main/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
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
