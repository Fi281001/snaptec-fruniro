import React, { useState, useEffect } from "react";
import "../main/Filter.css";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
export default function Filter({
  length,
  onShowItemsChange,
  onSortChange,
  itemsToShow2,
  sortOrder,
  minValue, // Thêm prop minValue
  maxValue, // Thêm prop maxValue
  onPriceChange,
}) {
  const totalitems = length; // Sử dụng length trực tiếp để tính totalitems
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
  // drawer
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  // const [minValue, setMinValue] = useState("500");
  // const [maxValue, setMaxValue] = useState("2000000");
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), max - 1); // Đảm bảo min không lớn hơn max - 1
    setMin(value); // Cập nhật giá trị min
    console.log("min", value);
    onPriceChange(value, max); // Gọi hàm truyền từ component cha
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), min + 1); // Đảm bảo max không nhỏ hơn min + 1
    setMax(value); // Cập nhật giá trị max
    console.log("max", value);
    onPriceChange(min, value); // Gọi hàm truyền từ component cha
  };

  useEffect(() => {
    setMin(minValue); // Cập nhật lại minValue từ props
    setMax(maxValue); // Cập nhật lại maxValue từ props
  }, [minValue, maxValue]);

  return (
    <div className="filter">
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <div className="drawer-content">
          <h1>Filter</h1>
          <div className="price-filter">
            <span>Price</span>
            <div class="range-input">
              <input
                type="range"
                className="min-range"
                min="500"
                max="2000000"
                step="100"
                value={minValue}
                onChange={handleMinChange}
              />

              <input
                type="range"
                className="max-range"
                min="500"
                max="2000000"
                step="100"
                value={maxValue}
                onChange={handleMaxChange}
              />
            </div>
            <div className="price-filter-title">
              <p>Min</p>
              <p>Max</p>
            </div>
          </div>
          <div className="Color-filter">
            <span>Color</span>
            <div className="checkbox-main">
              <div className="">
                <label>
                  <input type="checkbox" value="blue" />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                      backgroundColor: "#816dfa",
                    }}
                  ></div>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="orange" />

                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                      backgroundColor: "#b88e2f",
                    }}
                  ></div>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="black" />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                      backgroundColor: "black",
                    }}
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div className="btaction">
            <button>Apply</button>
          </div>
        </div>
      </Drawer>
      <div className="icon-filter">
        <span className="filter-name">
          <i className="bi bi-sliders" onClick={toggleDrawer}></i> Filter
        </span>
        <span>
          <i className="bi bi-grid-fill"></i>
        </span>
        <span>
          <i className="bi bi-list"></i>
        </span>
        <span className="line">|</span>
        <span className="show-page">
          Showing 1–{itemsToShow2} of {totalitems} results
        </span>
      </div>
      <div className="options">
        <span className="show-page">Show</span>
        <select
          value={itemsToShow2}
          className="show-option"
          onChange={handleShowChange}
        >
          <option value="12">12</option>
          <option value="8">8</option>
          <option value="6">6</option>
        </select>

        <span className="show-page">Sort by</span>
        <select value={sortOrder} className="short" onChange={handleSortChange}>
          <option value="A-Z">Default</option>
          <option value="Z-A">Z - A</option>
          <option value="ASC">Giá tăng dần</option>
          <option value="DESC">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
}
