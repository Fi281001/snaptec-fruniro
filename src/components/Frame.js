import React from "react";
import "../main/Frame.css";
import Group from "../image/icon_image/Group.png";
import Guarantee from "../image/icon_image/guarantee.png";
import Shipping from "../image/icon_image/shipping.png";
import Support from "../image/icon_image/customer-support.png";

export default function Frame() {
  return (
    <div className="frame">
      <div className="frame-block">
        <img className="icon-image" alt="" src={Group} />
        <div>
          <h3>High Quality</h3>
          <span>crafted from top materials</span>
        </div>
      </div>
      <div className="frame-block">
        <img className="icon-image" alt="" src={Guarantee} />
        <div>
          <h3>Warranty Protection</h3>
          <span>Over 2 years</span>
        </div>
      </div>
      <div className="frame-block">
        <img className="icon-image" alt="" src={Shipping} />
        <div>
          <h3>Free Shipping</h3>
          <span>Order over 150 $</span>
        </div>
      </div>
      <div className="frame-block">
        <img className="icon-image" alt="" src={Support} />
        <div>
          <h3>24 / 7 Support</h3>
          <span>Dedicated support</span>
        </div>
      </div>
    </div>
  );
}
