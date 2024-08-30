import React from "react";
import "../../main/Slider.css";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Living from "../../image/Image-living room.png";
import Bedroom from "../../image/Mask Group (1).png";
import Dining from "../../image/Mask Group.png";
export default function Slider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <div className="slider-main">
      <div className="slider-title">
        <div>
          <h1>50+ Beautiful rooms inspiration</h1>
          <p>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <button>Explore More</button>
        </div>
      </div>
      <div className="slider-content">
        <div className="slider-container">
          <Slick {...settings}>
            <div>
              <img alt="" src={Living} className="first-img" />
            </div>
            <div>
              <img alt="" src={Bedroom} className="other-img" />
            </div>
            <div>
              <img alt="" src={Dining} className="other-img" />
            </div>
            <div>
              <img alt="" src={Living} className="other-img" />
            </div>
            <div>
              <img alt="" src={Bedroom} className="other-img" />
            </div>
            <div>
              <img alt="" src={Dining} className="other-img" />
            </div>
          </Slick>
        </div>
      </div>
    </div>
  );
}
