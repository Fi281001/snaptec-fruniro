import React from "react";
import { useState, useEffect } from "react";
import "../main/Products.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { FacebookShareButton } from "react-share";
import { useLocation } from "react-router-dom";
export default function Products({
  item,
  onLengthChange,
  sortOrder,
  currentPage,
}) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    // Hàm để lấy dữ liệu từ Firebase qua axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://furino-2343b-default-rtdb.firebaseio.com/product.json"
        );
        if (response.data) {
          const x = response.data;
          const validProducts = x.filter(
            (item) => item !== null && item !== undefined
          );
          setProducts(validProducts); // Cập nhật state với dữ liệu nhận được
          onLengthChange(response.data.length);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [onLengthChange]);

  let sortedProducts = [...products];
  if (sortOrder === "A-Z") {
    sortedProducts.sort((a, b) => a?.name?.localeCompare(b?.name)); // Sắp xếp theo A-Z
  } else if (sortOrder === "Z-A") {
    sortedProducts.sort((a, b) => b?.name?.localeCompare(a?.name)); // Sắp xếp theo Z-A
  }
  if (sortOrder === "ASC") {
    sortedProducts.sort((a, b) =>
      parseFloat(
        a?.pricesale.replace(/\./g, "") - b?.pricesale.replace(/\./g, "")
      )
    ); // Sắp xếp theo giá tăng dần
  } else if (sortOrder === "DESC") {
    sortedProducts.sort((a, b) =>
      parseFloat(
        b?.pricesale.replace(/\./g, "") - a?.pricesale.replace(/\./g, "")
      )
    ); // Sắp xếp theo giá giảm dần
  }
  const isShopPage = location.pathname === "/shop";
  const limitedProducts = sortedProducts.slice(0, item);
  const handleCompare = (id) => {
    navigate(`/compare/${id}`);
  };
  const startIndex = (currentPage - 1) * item;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + item);
  const displayedProducts = isShopPage ? currentProducts : limitedProducts;
  return (
    <>
      <div className="Products">
        {displayedProducts.map((product) => (
          <div key={product?.id} className="product-item">
            <div className="overlay-product"></div>

            <img
              src={product?.imgSrc}
              alt={product?.name}
              className="image product-image"
            />

            <div className="middle">
              <button className="butadd">
                <Link to={`/single-product/${product?.id}`}>Add to card</Link>
              </button>

              <div className="title">
                <span>
                  <FacebookShareButton
                    className="color-icon"
                    url={`https://snaptec-fruniro.vercel.app/single-product/${product?.id}`}
                  >
                    <i className="bi bi-share"></i>Share
                  </FacebookShareButton>
                </span>
                <span onClick={() => handleCompare(product.id)}>
                  <i className="bi bi-arrow-left-right"></i>
                  Compare
                </span>
                <span>
                  <i className="bi bi-heart"></i>Like
                </span>
              </div>
            </div>
            {product?.sale && (
              <div
                className={`sale-label ${
                  product?.sale === "New" ? "new-label" : ""
                }`}
              >
                {product?.sale}
              </div>
            )}

            <div className="product-name">{product?.name}</div>
            <div className="product-title">{product?.title}</div>
            <div className="price">
              <div className="product-price">Rp {product?.pricesale}</div>
              <div className="product-price-sale">
                {product?.price === "" ? "" : `Rp ${product?.price}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
