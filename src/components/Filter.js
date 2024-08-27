import React from "react";
import "../main/Filter.css";
export default function Filter() {
  return (
    <div className="filter">
      <div className="icon-filter">
        <span className="filter-name">
          <i class="bi bi-sliders"></i> Filter
        </span>
        <span>
          <i class="bi bi-grid-fill"></i>
        </span>
        <span>
          <i class="bi bi-list"></i>
        </span>
        <span className="line">|</span>
        <span className="show-page">Showing 1–16 of 32 results</span>
      </div>
      <div className="options">
        <span className="show-page">Show</span>
        <input className="show" />
        <span className="show-page">Short by</span>
        <input className="short" />
      </div>
    </div>
  );
}
