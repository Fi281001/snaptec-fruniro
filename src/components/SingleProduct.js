import React from "react";
import "../main/SingleProduct.css";
import Products from "./Products.js";
import { Link } from "react-router-dom";
import thumbnail1 from "../image/single-product/Thumbnail1.png";
import thumbnail2 from "../image/single-product/Thumbnail2.png";
import thumbnail3 from "../image/single-product/Thumbnail3.png";
import thumbnail4 from "../image/single-product/Thumbnail4.png";
import productImage from "../image/single-product/Product-image.png";
import img1 from "../image/single-product/Image1.png";
import img2 from "../image/single-product/Image2.png";

export const SingleProduct = () => {
  return (
    <div>
      <div className="breadcrumb">
        <span>
          <Link to="/" className="breadcrumb__td-none">
            Home
          </Link>
          <i class="bi bi-chevron-right ml-30px"></i>
        </span>
        <span>
          <Link to="/shop" className="breadcrumb__td-none">
            Shop
          </Link>
          <i class="bi bi-chevron-right ml-30px"></i>
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
              src={productImage}
              alt="product"
            />
          </div>
          <div className="product-detail__product-content">
            <h1 className="product-detail__h1">Asgaard sofa</h1>
            <h2 className="product-detail__h2">Rs. 250,000.00</h2>
            <div className="product-detail__i">
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-dash-lg"></i>
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
              <div className="product-detail__size-L">L</div>
              <div className="product-detail__size-XL">XL</div>
              <div className="product-detail__size-XS">XS</div>
            </div>
            <p className="product-detail__p-size-color">Color</p>
            <div className="display-flex">
              <div class="product-detail__color-blue"></div>
              <div class="product-detail__color-black"></div>
              <div class="product-detail__color-yellow"></div>
            </div>
            <div className="display-flex">
              <div className="quatity">
                {/* <i class="bi bi-dash"></i> */}1
                {/* <i class="bi bi-plus"></i> */}
              </div>
              <div className="cart">Add To Card</div>
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
                  <i class="bi bi-facebook"></i>
                  <i class="bi bi-linkedin"></i>
                  <i class="bi bi-twitter"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div className="related-products">
        <h1>Related Products</h1>
        <div className="related-products_Products">
          <Products item={4} />
        </div>
        <div className="w-100">
          <button className="related-products_showmore">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};
