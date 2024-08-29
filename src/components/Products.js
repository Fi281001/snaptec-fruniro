import React from "react";
import "../main/Products.css";
import products from "../untils/Data";
import { Link } from "react-router-dom";
export default function Products({ item }) {
  const limitedProducts = products.slice(0, item);
  return (
    <>
      <div className="Products">
        {limitedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div class="overlay-product"></div>
           
              <img
                src={product.imgSrc}
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
