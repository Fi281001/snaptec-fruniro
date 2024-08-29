import React from "react";
import "../main/Cartheader.css";
import { Link, NavLink } from "react-router-dom";
import image1 from "../image/products/image 1.png";
export default function Cartheader({ onClose }) {
  return (
    <>
      <div>
        <div className="cart-title">
          <h3>Shopping Cart</h3>
          <i onClick={onClose} class="bi bi-bag-x"></i>
        </div>
        <hr className="hr" />
        <div className="cart-body">
          <img alt=" " src={image1} />
          <div>
            <span>name</span>
            <div>
              <p>1</p>
              <p>x</p>
              <p className="price">Rs. 250,000.000</p>
            </div>
          </div>
          <i class="bi bi-x-circle-fill"></i>
        </div>
        <div className="cart-body">
          <img alt=" " src={image1} />
          <div>
            <span>name</span>
            <div>
              <p>1</p>
              <p>x</p>
              <p className="price">Rs. 250,000.000</p>
            </div>
          </div>
          <i class="bi bi-x-circle-fill"></i>
        </div>
        <div className="total">
          <span className="total-name">Subtotal</span>
          <span className="total-price">Rs. 520,000.00</span>
        </div>
        <hr className="hr2" />
        <div className="cart-buttons">
          <NavLink to="/cart" onClick={onClose} className="btn">
            Cart
          </NavLink>
          <button className="btn">Checkout</button>
          <button className="btn ">Comparison</button>
        </div>
      </div>
    </>
  );
}
