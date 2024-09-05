import React from "react";
import banner from "../../image/banner2.png";
import "../../main/Banner.css";

export default function Banner() {
  console.log("banner", banner);
  return (
    <div className="banner">
      <img src={banner} />
      {/* <div className="banner-title">
        <div className="container">
          <span>New Arrial</span>
          <h2>Discover Our</h2>
          <h2> New Collection</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button>BUY NOW</button>
        </div>
      </div> */}
    </div>
  );
}
