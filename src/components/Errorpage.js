import React from "react";
import errorpage from "../image/errorpage.png";
import "../main/Errorpage.css";
export default function Errorpage() {
  return (
    <div>
      <img className="error" s alt="not found" src={errorpage} />
    </div>
  );
}
