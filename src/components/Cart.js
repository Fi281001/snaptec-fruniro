import React, { useEffect } from "react";
import "../main/Cart.css";
import Rectangle from "./Rectangle";
import Frame from "./Frame";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, removeFromCartAsync } from "../redux/CartSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Lấy danh sách items từ Redux store
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Chuyển hướng đến trang checkout
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi người dùng đăng nhập
  }, [dispatch]);
  const reversedCartItems = cartItems ? [...cartItems].reverse() : [];

  // hàm tính subtotal
  const ProductRow = ({ priceString, quantity }) => {
    if (!priceString) {
      return null; // Hoặc xử lý lỗi theo cách khác
    }

    // Chuyển đổi giá từ chuỗi thành số
    const priceNumber = parseFloat(
      priceString.replace(/\./g, "").replace(",", ".")
    );

    // Tính tổng giá trên mỗi sản phẩm
    const totalPrice = priceNumber * quantity;

    return (
      <td className="color-black">{`Rp ${totalPrice.toLocaleString()}`}</td>
    );
  };

  // tính tổng số sản phẩm
  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  // tính tổng tiền
  const SubTotal = cartItems.reduce((total, item) => {
    const priceString = item.pricesale.replace(/\./g, ""); // Xóa dấu chấm
    const priceNumber = parseFloat(priceString.replace(/,/g, "."));
    return total + priceNumber * item.quantity;
  }, 0);
  const formattedSubTotal = SubTotal.toLocaleString("id-ID");
  // delete cart
  const handleRemove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the product ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Delete successfully");
        dispatch(removeFromCartAsync(item.productId));
      }
    });
    dispatch(removeFromCartAsync(cartItems.productId));
  };
  console.log("cart", reversedCartItems);

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
                  <tr key={item.productId}>
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
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => handleRemove(item)}
                      ></i>
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
            <span>Total Quantity</span>
            <p>{totalQuantity}</p>
          </div>
          <div className="container-right__display-flex">
            <span>SubTotal</span>
            <p className="container-right__p">Rs. {formattedSubTotal} </p>
          </div>
          <div className="container-right__w-100">
            <button
              className="container-right__btn-checkout"
              onClick={handleCheckout}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <Frame />
    </>
  );
};

export default Cart;
