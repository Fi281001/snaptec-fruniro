import React from "react";
import Banner from "./HomePage/Banner.js";
import Browtherange from "./HomePage/Browtherange";
import Ourproduct from "./HomePage/Ourproduct";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loading spinner
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
              width: "90vw",
            }}
          >
            <ReactLoading
              type="spinningBubbles"
              color="#B88E2F"
              height={200} // Adjust the height
              width={200}
            />
          </div>
        ) : (
          <div>
            <Banner />
            <div className="hp-container">
              <Browtherange />
            </div>
            <div className="hp-container">
              <Ourproduct />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
