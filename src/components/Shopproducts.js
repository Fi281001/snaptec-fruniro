import React from "react";
import "../main/Shopproducts.css";
import products from "../untils/Data";

export default function Shopproducts() {
  return (
    <>
      <div className="Products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div class="overlay"></div>
            <div className="container">
              <img
                src={product.imgSrc}
                alt={product.name}
                className="image product-image"
              />

              <div className="middle">
                <div className="text">Add to cart</div>
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
            </div>
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
