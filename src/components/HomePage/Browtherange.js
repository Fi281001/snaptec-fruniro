import React from "react";
import "../../main/Browtherange.css";
import Living from "../../image/Image-living room.png";
import Bedroom from "../../image/Mask Group (1).png";
import Dining from "../../image/Mask Group.png";
export default function Browtherange() {
  return (
    <>
      <div className="range">
        <div className="range-title">
          <h2>Browse The Range</h2>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        </div>
        <div className="range-item">
          <div className="image">
            <img alt="" src={Dining} />
            <span>Dining</span>
          </div>
          <div>
            <img alt="" src={Living} />
            <span>Living</span>
          </div>
          <div className="bedroom">
            <img alt="" src={Bedroom} />
            <span>Bedroom</span>
          </div>
        </div>
      </div>
    </>
  );
}
