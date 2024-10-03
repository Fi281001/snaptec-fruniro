import React from "react";
import { useState, useEffect } from "react";
import "../main/Products.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

export default function Products({ item, onLengthChange, sortOrder }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Hàm để lấy dữ liệu từ Firebase qua axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://furino-2343b-default-rtdb.firebaseio.com/product.json"
        );
        if (response.data) {
          setProducts(response.data); // Cập nhật state với dữ liệu nhận được
          onLengthChange(response.data.length);
          const slicedProducts = products.slice(0, 10);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [onLengthChange]);
  // let sortedProducts = [...products];
  // if (sortOrder === "price-asc") {
  //   sortedProducts.sort((a, b) => a.pricesale - b.pricesale);
  // } else if (sortOrder === "price-desc") {
  //   sortedProducts.sort((a, b) => b.pricesale - a.pricesale);
  // }
  const limitedProducts = products.slice(1, item + 1);
  return (
    <>
      <div className="Products">
        {limitedProducts.map((product) => (
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
                  <i className="bi bi-share"></i>Share
                </span>
                <span>
                  <i className="bi bi-arrow-left-right"></i>Compare
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
