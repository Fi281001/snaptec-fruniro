import React, { useEffect } from "react";
import "../main/Cart.css";
import Rectangle from "./Rectangle";
import Frame from "./Frame";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync } from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store

  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
  }, [dispatch]);
  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];

  // hàm tính subtotal
  const ProductRow = ({ priceString, quantity }) => {
    if (!priceString) {
      console.error("priceString is undefined or null");
      return null; // Hoặc xử lý lỗi theo cách khác
    }

    // Chuyển đổi giá từ chuỗi thành số
    const priceNumber = parseFloat(
      priceString.replace(/\./g, "").replace(",", ".")
    );

    // Tính tổng giá
    const totalPrice = priceNumber * quantity;

    return (
      <td className="color-black">{`Rp ${totalPrice.toLocaleString()}`}</td>
    );
  };
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
              {reversedCartItems && reversedCartItems.length > 0 ? (
                reversedCartItems.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" className="content-table__th">
                      <img src={item.imgSrc || ""} alt={item.name} />
                    </th>
                    <td>{item.name}</td>
                    <td>{item.pricesale}</td>
                    <td className="color-black">
                      <input
                        required
                        className="reatangle_input"
                        value={item.quantity}
                        type="text"
                        readOnly
                      />
                    </td>
                    <ProductRow
                      priceString={item.pricesale}
                      quantity={item.quantity}
                    />
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
            <p>Rs. </p>
          </div>
          <div className="container-right__display-flex">
            <span>Total</span>
            <p className="container-right__p">Rs. </p>
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
