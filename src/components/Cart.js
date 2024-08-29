import React from "react";
import "../main/Cart.css";
import Rectangle from "./Rectangle";
import thumbnail1 from "../image/single-product/Thumbnail1.png";
import Frame from "./Frame";
const Cart = () => {
  return (
    <>
      <Rectangle title="Cart" />
      <div className="set-width-height">
        <div className="container-left">
          <table class="content-table">
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
              <tr>
                <th scope="row" className="content-table__th">
                  <img src={thumbnail1} alt="thumbnail-1" />
                </th>
                <td>Asgaard sofa</td>
                <td>Rs. 250,000.00</td>
                <td className="color-black">
                  <input
                    required
                    className="reatangle_input"
                    value={1}
                    type="text"
                  />
                </td>
                <td className="color-black">Rs. 250,000.00</td>
                <td className="color-black">
                  <i class="bi bi-trash-fill"></i>
                </td>
              </tr>
              <tr>
                <th scope="row" className="content-table__th">
                  <img src={thumbnail1} alt="thumbnail-1" />
                </th>
                <td>Asgaard sofa</td>
                <td>Rs. 250,000.00</td>
                <td className="color-black">
                  <input
                    required
                    className="reatangle_input"
                    value={1}
                    type="text"
                  />
                </td>
                <td className="color-black">Rs. 250,000.00</td>
                <td className="color-black">
                  <i class="bi bi-trash-fill"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container-right">
          <div className="container-right__cart-totals">Cart Totals</div>
          <div className="container-right__display-flex">
            <span>Subtotal</span>
            <p>Rs. 250,000.00</p>
          </div>
          <div className="container-right__display-flex">
            <span>Total</span>
            <p className="container-right__p">Rs. 250,000.00</p>
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
