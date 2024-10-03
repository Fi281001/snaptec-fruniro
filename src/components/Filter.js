import React, { useState } from "react";
import "../main/Filter.css";

export default function Filter({ length, onShowItemsChange, onSortChange }) {
  const totalitems = length - 1; // Sử dụng length trực tiếp để tính totalitems
  const [itemsToShow, setItemsToShow] = useState(12); // Giá trị mặc định là 12

  const handleShowChange = (event) => {
    const selectedValue = parseInt(event.target.value); // Lấy giá trị từ dropdown
    setItemsToShow(selectedValue); // Cập nhật số lượng item được hiển thị
    onShowItemsChange(selectedValue); // Gọi hàm truyền từ component cha
  };
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value; // Lấy giá trị từ dropdown
    onSortChange(selectedSortOrder); // Gọi hàm truyền từ component cha để cập nhật cách sắp xếp
  };
  const totalDisplayItems = Math.min(itemsToShow, totalitems); // Số item hiển thị

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
        <span className="show-page">
          Showing 1–{totalDisplayItems} of {totalitems} results
        </span>
      </div>
      <div className="options">
        <span className="show-page">Show</span>
        <select className="show-option" onChange={handleShowChange}>
          <option value="12">12</option>
          <option value="8">8</option>
          <option value="6">6</option>
        </select>

        <span className="show-page">Sort by</span>
        <select className="short">
          <option value="default">Default</option>
          <option value="Z-A">Z - A</option>
        </select>
      </div>
    </div>
  );
}
