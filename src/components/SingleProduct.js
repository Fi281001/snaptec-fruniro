import React from "react";
import "../main/SingleProduct.css";
import Products from "./Products.js";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import thumbnail1 from "../image/single-product/Thumbnail1.png";
import thumbnail2 from "../image/single-product/Thumbnail2.png";
import thumbnail3 from "../image/single-product/Thumbnail3.png";
import thumbnail4 from "../image/single-product/Thumbnail4.png";
import img1 from "../image/single-product/Image1.png";
import img2 from "../image/single-product/Image2.png";
import axios from "axios";
import { useParams } from "react-router-dom"; // Nếu bạn sử dụng React Router
import { useDispatch } from "react-redux";
import { addToCartAsync, syncCartAfterLogin } from "../redux/CartSlice";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export const SingleProduct = () => {
  const { productId } = useParams();
  const [productLength, setProductLength] = useState(0);
  const [items, setItems] = useState(5); // Số lượng sản phẩm ban đầu
  const [color, setColor] = useState("blue");
  const [size, setSize] = useState("L");

  const id = productId;
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const url = `https://snaptec-fruniro.vercel.app/single-product/${id}`;
  const showMore = () => {
    setItems((prevItems) => prevItems + 4); // Tăng thêm 4 sản phẩm
  };
  const navigate = useNavigate();
  // Lấy productId từ URL khi dùng router
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Hàm để lấy dữ liệu chi tiết sản phẩm từ Firebase
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://furino-2343b-default-rtdb.firebaseio.com/product/${productId}.json`
        );
        if (response.data) {
          setProduct(response.data);
        } else {
          console.log("No product data available");
        }
      } catch (error) {
        console.error("Error fetching product details: ", error);
      }
    };

    fetchProductDetail();
  }, [productId]);
  const handleLengthChange = (length) => {
    setProductLength(length); // Cập nhật length từ Products
  };
  const allItemsDisplayed = items >= productLength;

  // add to cart
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  const handleAddToCart = () => {
    // if (user) {
    if (product) {
      // Kiểm tra product trước khi thêm vào giỏ hàng
      const cartItem = {
        productId: productId,
        name: product.name || "Unknown", // Đảm bảo name không undefined
        pricesale: product.pricesale, // Đảm bảo price có giá trị
        imgSrc: product.imgSrc, // Đảm bảo img không undefined
        quantity: quantity,
        selectedSize: size, // Thêm kích thước đã chọn
        selectedColor: color, // Thêm màu sắc đã chọn
      };
      toast.success("Add to cart successfully");
      dispatch(addToCartAsync(cartItem));
      // if (user) {
      //   // Nếu đã đăng nhập, thêm sản phẩm vào giỏ hàng Firebase
      //   toast.success("Add to cart successfully");
      //   dispatch(addToCartAsync(cartItem));
      // } else {
      //   // Nếu chưa đăng nhập, lưu sản phẩm vào localStorage
      //   let cartItems = JSON.parse(localStorage.getItem("guestCart")) || [];
      //   cartItems.push(cartItem);
      //   console.log("cart", cartItems);
      //   console.log("cart2", cartItem);
      //   localStorage.setItem("guestCart", JSON.stringify(cartItems));
      //   toast.success("Item added to cart (guest)");
      // }
      setQuantity(1);
    } else {
      console.log("Product data is not available");
    }
    // } else {
    // Swal.fire({
    //   title: "You Need Login!",
    //   icon: "warning",
    //   showCancelButton: false,
    // }).then((result) => {
    //   navigate("/login");
    // });
    //}
  };
  // useEffect(() => {
  //   if (user) {
  //     const guestCart = JSON.parse(localStorage.getItem("guestCart"));
  //     if (guestCart && guestCart.length > 0) {
  //       // Dispatch hành động đồng bộ giỏ hàng
  //       dispatch(syncCartAfterLogin(guestCart));
  //       // Xóa giỏ hàng tạm trong localStorage sau khi đồng bộ
  //       localStorage.removeItem("guestCart");
  //     }
  //   }
  // }, [user, dispatch]);
  return (
    <div>
      <div className="breadcrumb">
        <span>
          <Link to="/" className="breadcrumb__td-none">
            Home
          </Link>
          <i className="bi bi-chevron-right ml-30px"></i>
        </span>
        <span>
          <Link to="/shop" className="breadcrumb__td-none">
            Shop
          </Link>
          <i className="bi bi-chevron-right ml-30px"></i>
        </span>
        <span>Asgaard sofa</span>
      </div>
      <div className="product-detail">
        <div className="product-detail__group">
          <div className="product-detail__thumbnail">
            <img src={thumbnail1} alt="image-1" />
            <img src={thumbnail2} alt="image-2" />
            <img src={thumbnail3} alt="image-3" />
            <img src={thumbnail4} alt="image-4" />
          </div>
          <div className="product-detail__bg-product-image">
            {/* <img src={bgproductImage} alt="" /> */}
            <img
              className="product-detail__product-image"
              src={product?.imgSrc}
              alt="product"
            />
          </div>
          <div className="product-detail__product-content">
            <h1 className="product-detail__h1">{product?.name}</h1>
            <h2 className="product-detail__h2_sale">{product?.pricesale}</h2>
            <h2 className="product-detail__h2">{product?.price}</h2>
            <div className="product-detail__i">
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-dash-lg"></i>
              <span className="product-detail__customer-review">
                5 Customer Review
              </span>
            </div>
            <p className="product-detail__p">
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced
              audio which boasts a clear midrange and extended highs for a
              sound.
            </p>

            <p className="product-detail__p-size-color">Size</p>
            <div className="display-flex">
              <div
                className={`product-detail__size ${
                  size === "L" ? "selected" : ""
                }`}
                onClick={() => setSize("L")}
              >
                L
              </div>
              <div
                className={`product-detail__size ${
                  size === "XL" ? "selected" : ""
                }`}
                onClick={() => setSize("XL")}
              >
                XL
              </div>
              <div
                className={`product-detail__size ${
                  size === "XS" ? "selected" : ""
                }`}
                onClick={() => setSize("XS")}
              >
                XS
              </div>
            </div>

            <p className="product-detail__p-size-color">Color</p>
            <div className="display-flex">
              <div
                className={`product-detail__color-blue ${
                  color === "blue" ? "selected" : ""
                }`}
                onClick={() => setColor("blue")}
              ></div>
              <div
                className={`product-detail__color-black ${
                  color === "black" ? "selected" : ""
                }`}
                onClick={() => setColor("black")}
              ></div>
              <div
                className={`product-detail__color-yellow ${
                  color === "yellow" ? "selected" : ""
                }`}
                onClick={() => setColor("yellow")}
              ></div>
            </div>
            <div className="display-flex">
              <div className="quatity">
                <i className="bi bi-dash" onClick={handleDecrement}></i>{" "}
                {quantity}
                <i className="bi bi-plus" onClick={handleIncrement}></i>
              </div>
              <div className="cart" onClick={handleAddToCart}>
                Add To Card
              </div>
              <div className="compare">+ Compare</div>
            </div>
            <hr />
            <div className="display-flex">
              <div className="display-grid">
                <span>SKU </span>
                <span>Category </span>
                <span>Tags </span>
                <span>Share </span>
              </div>
              <div className="display-grid">
                <span>:</span>
                <span>:</span>
                <span>:</span>
                <span>:</span>
              </div>
              <div className="display-grid">
                <span> SS011</span>
                <span> Sofas</span>
                <span> Sofa, Chair, Home, Shop</span>
                <span className="icon">
                  <FacebookShareButton className="color-icon" url={url}>
                    <i className="bi bi-facebook"></i>
                  </FacebookShareButton>

                  <LinkedinShareButton className="color-icon" url={url}>
                    <i className="bi bi-linkedin"></i>
                  </LinkedinShareButton>

                  <TwitterShareButton className="color-icon" url={url}>
                    <i className="bi bi-twitter"></i>
                  </TwitterShareButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="description-information-review">
        <div className="df">
          <span className="description">Description</span>
          <span className="information">Additional Information</span>
          <span className="review">Review [5]</span>
        </div>
        <div className="db">
          <span>
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </span>
          <span>
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering. Setting the bar as one of the loudest
            speakers in its class, the Kilburn is a compact, stout-hearted hero
            with a well-balanced audio which boasts a clear midrange and
            extended highs for a sound that is both articulate and pronounced.
            The analogue knobs allow you to fine tune the controls to your
            personal preferences while the guitar-influenced leather strap
            enables easy and stylish travel.
          </span>
        </div>
        <div className="img">
          <img src={img1} alt="image-1" />
          <img src={img2} alt="image-2" />
        </div>
      </div>
      <hr />
      <div className="related-products">
        <h1>Related Products</h1>
        <div className="related-item">
          <Products item={items - 1} onLengthChange={handleLengthChange} />
        </div>
        <div className="but-show-more">
          <button
            onClick={showMore}
            style={{
              opacity: allItemsDisplayed ? 0.5 : 1, // Làm mờ nút nếu đã hết sản phẩm
              cursor: allItemsDisplayed ? "not-allowed" : "pointer",
            }}
          >
            {allItemsDisplayed ? "Out of product" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};
