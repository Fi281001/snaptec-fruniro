import React, { useEffect } from "react";
import "../main/Cart.css";
import Rectangle from "./Rectangle";
import Frame from "./Frame";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync } from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []); // Lấy danh sách items từ Redux store

  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
  }, [dispatch]);

  return (
    <>
      <Rectangle title="Cart" />
      <div className="set-width-height">
        <div className="container-left">
          <table className="content-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" className="content-table__th">
                      <img src={item.image || ""} alt={item.name} />
                    </th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td className="color-black">
                      <input
                        required
                        className="reatangle_input"
                        value={item.quantity}
                        type="text"
                        readOnly
                      />
                    </td>
                    <td className="color-black">
                      {item.price * item.quantity}
                    </td>
                    <td className="color-black">
                      <i className="bi bi-trash-fill"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="color-black">
                    No items in cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="container-right">
          <div className="container-right__cart-totals">Cart Totals</div>
          <div className="container-right__display-flex">
            <span>Subtotal</span>
            <p>
              Rs.{" "}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <div className="container-right__display-flex">
            <span>Total</span>
            <p className="container-right__p">
              Rs.{" "}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <div className="container-right__w-100">
            <button className="container-right__btn-checkout">Check Out</button>
          </div>
        </div>
      </div>
      <Frame />
    </>
  );
};

export default Cart;
