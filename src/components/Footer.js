import React from "react";
import "../main/Footer.css";
export default function Footer() {
  return (
    <>
      <div className="footer">
        <div class="footer-container">
          <div className="footer-main">
            <div className="col-1">
              <h2>Funiro.</h2>
              <span className="span1">
                400 University Drive Suite 200 Coral Gables,
              </span>
              <br />
              <span> FL 33134 USA</span>
            </div>
            <div className="col-2">
              <div className="col-2-1">
                <p
                  className="
                title-p"
                >
                  Links
                </p>
                <p>Home</p>
                <p>Shop</p>
                <p>About</p>
                <p>Contact</p>
              </div>
              <div className="col-2-2">
                <p
                  className="
                title-p"
                >
                  Help
                </p>
                <p>Payment Options </p>
                <p>Returns</p>
                <p>Privacy Policies</p>
              </div>
              <div className="col-2-3">
                <p
                  className="
                title-p"
                >
                  Newsletter
                </p>
                <input
                  type="text"
                  class="input-underline"
                  placeholder="Enter Your Email Address"
                />

                <button class="button-underline">SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-title">2023 furino. All rights reverved</div>
        </div>
      </div>
    </>
  );
}
