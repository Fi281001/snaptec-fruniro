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
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slides = [
    { id: 1, src: Living },
    { id: 2, src: Bedroom },
    { id: 3, src: Dining },
    { id: 4, src: Living },
    { id: 5, src: Bedroom },
    { id: 6, src: Dining },
  ];

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
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={index % 2 === 0 ? "slider-div" : "slider-div2"}
              >
                <img
                  alt=""
                  src={slide.src}
                  className={index % 2 === 0 ? "first-img" : "other-img"}
                />
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </div>
  );
}
