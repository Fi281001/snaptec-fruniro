import React from "react";
import "../main/Filter.css";
export default function Filter() {
  return (
    <div className="filter">
      <div className="icon-filter">
        <span className="filter-name">
          <i className="bi bi-sliders"></i> Filter
        </span>
        <span>
          <i className="bi bi-grid-fill"></i>
        </span>
        <span>
          <i className="bi bi-list"></i>
        </span>
        <span className="line">|</span>
        <span className="show-page">Showing 1–16 of 32 results</span>
      </div>
      <div className="options">
        <span className="show-page">Show</span>
        <select className="show-option">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <span className="show-page">Short by</span>
        <select className="short">
          <option value="default">Default</option>
          <option value="A-Z">A - Z</option>
          <option value="Price">Z - A</option>
        </select>
      </div>
    </div>
  );
}
