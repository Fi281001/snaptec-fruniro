import React from "react";
import "../main/Products.css";
import products from "../untils/Data";
export default function Products() {
  return (
    <>
      <div className="Products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="image-container">
              <img
                src={product.imgSrc}
                alt={product.name}
                className="product-image"
              />
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
                {product.price == "" ? "" : product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="but">
        <button>Show More</button>
      </div>
    </>
  );
}
