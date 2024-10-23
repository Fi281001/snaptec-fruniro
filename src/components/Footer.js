import React, { useEffect, useState } from "react";
import "../main/Footer.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevents the default behavior of the link
    if (location.pathname === "/") {
      // If already on the home page, reload the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Otherwise, navigate to the home page
      navigate("/");
    }
  };
  const [placeholderText, setPlaceholderText] = useState(
    "Enter Your Email Address"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setPlaceholderText("Enter Your Email");
      } else {
        setPlaceholderText("Enter Your Email Address");
      }
    };
    handleResize();

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="col-1">
              <h2>Funiro</h2>
              <span className="span1">
                400 University Drive Suite 200 Coral Gables,
              </span>
              <br />
              <span> FL 33134 USA</span>
            </div>
            <div className="col-2">
              <div className="col-2-1">
                <p className="title-p">Links</p>
                <div className="flex-direction-row">
                  <Link to="/" className="title-home" onClick={handleLinkClick}>
                    Home
                  </Link>
                  <Link to="/shop" className="title-shop">
                    Shop
                  </Link>
                  <Link to="/blog" className="title-blog">
                    Blog
                  </Link>
                  <Link to="/contact" className="title-contact">
                    Contact
                  </Link>
                </div>
              </div>
              <div className="col-2-2">
                <p className="title-p">Help</p>
                <div className="flex-direction-row">
                  <Link to="/" className="title-payment">
                    Payment Options
                  </Link>
                  <Link to="/" className="title-returns">
                    Returns
                  </Link>
                  <Link to="/" className="title-privacy">
                    Privacy Policies
                  </Link>
                </div>
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
                  className="input-underline"
                  placeholder={placeholderText}
                />
                <button className="button-underline">SUBSCRIBE</button>
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
