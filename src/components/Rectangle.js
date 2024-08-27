import React from "react";
import Rectangleimg from "./../image/Rectangle1.png";
import "../main/Rectangle.css";
export default function Rectangle({ title }) {
  return (
    <>
      <div className="rectangle-container">
        <img className="img" alt="ERROR" src={Rectangleimg} />
        <div className="text-container">
          <h1>{title}</h1>
          <div className="nav">
            <p className="home">Home</p>
            <span className="separator">&gt;</span>
            <p className="shop">{title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
