import React from "react";
import { useState, useEffect } from "react";
import "../main/Products.css";

import { Link } from "react-router-dom";
import { database } from "../firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
export default function Products({ item }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Hàm để lấy dữ liệu từ Firebase
    const fetchData = async () => {
      try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "product/"));
        if (snapshot.exists()) {
          setProducts(snapshot.val()); // Cập nhật state với dữ liệu nhận được
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  console.log("products", products);
  const limitedProducts = products.slice(0, item);
  return (
    <>
      <div className="Products">
        {limitedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div class="overlay-product"></div>

            <img
              src={`${product.imgSrc}`} // Đường dẫn từ thư mục public
              alt={product.name}
              className="image product-image"
            />

            <div className="middle">
              <button className="butadd">
                <Link to="/single-product">Add to card</Link>
              </button>

              <div className="title">
                <span>
                  <i class="bi bi-share"></i>Share
                </span>
                <span>
                  <i class="bi bi-arrow-left-right"></i>Compare
                </span>
                <span>
                  <i class="bi bi-heart"></i>Like
                </span>
              </div>
            </div>
            {product.sale && (
              <div
                className={`sale-label ${
                  product.sale === "New" ? "new-label" : ""
                }`}
              >
                {product.sale}
              </div>
            )}

            <div className="product-name">{product.name}</div>
            <div className="product-title">{product.title}</div>
            <div className="price">
              <div className="product-price">Rp {product.pricesale}</div>
              <div className="product-price-sale">
                {product.price === "" ? "" : `Rp ${product.price}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
