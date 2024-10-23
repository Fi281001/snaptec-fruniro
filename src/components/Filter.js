import React, { useState, useEffect, useCallback } from "react";
import "../main/Filter.css";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import debounce from "lodash.debounce";
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
  const totalitems = length + 1; // Sử dụng length trực tiếp để tính totalitems
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

  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), max - 1); // Đảm bảo min không lớn hơn max - 1
    setMin(value); // Cập nhật giá trị min
    onPriceChange(value, max); // Gọi hàm truyền từ component cha
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), min + 1); // Đảm bảo max không nhỏ hơn min + 1
    setMax(value); // Cập nhật giá trị max
    onPriceChange(min, value); // Gọi hàm truyền từ component cha
  };
  const debouncedPriceChange = useCallback(
    debounce((min, max) => {
      onPriceChange(min, max);
    }, 1000), // Đợi 300ms sau khi người dùng dừng nhập
    []
  );
  useEffect(() => {
    debouncedPriceChange(min, max);
    // Hủy debounce khi component bị hủy
    return () => {
      debouncedPriceChange.cancel();
    };
  }, [min, max, debouncedPriceChange]);

  // color
  const [selectedColor, setSelectedColor] = useState("");

  const handleCircleClick = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    if (selectedColor) {
      alert(`Bạn đã chọn màu ${selectedColor}`);
    } else {
      alert("Hãy chọn một màu trước khi submit!");
    }
  };

  const circleStyle = (color) => ({
    width: "30px",
    height: "30px",
    borderRadius: "100%",
    backgroundColor: color,
    border: selectedColor === color ? "3px solid blue" : "none",
    cursor: "pointer",
  });
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
                min="150000"
                max="8000000"
                step="100"
                value={minValue}
                onChange={handleMinChange}
              />

              <input
                type="range"
                className="max-range"
                min="150000"
                max="8000000"
                step="100"
                value={maxValue}
                onChange={handleMaxChange}
              />
            </div>
            <div className="price-filter-title">
              <p>{minValue}</p>
              <p>{maxValue}</p>
            </div>
          </div>
          <div className="Color-filter">
            <span>Color</span>
            <div className="checkbox-main">
              <div className="">
                <label>
                  <div
                    style={circleStyle("#816dfa")}
                    onClick={() => handleCircleClick("#816dfa")}
                  ></div>
                </label>
              </div>
              <div>
                <label>
                  <div
                    style={circleStyle("#b88e2f")}
                    onClick={() => handleCircleClick("#b88e2f")}
                  ></div>
                </label>
              </div>
              <div>
                <label>
                  <div
                    style={circleStyle("black")}
                    onClick={() => handleCircleClick("black")}
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div className="btaction">
            <button onClick={handleSubmit}>Apply</button>
          </div>
        </div>
      </Drawer>
      <div className="icon-filter">
        <span className="filter-name">
          <i className="bi bi-sliders" onClick={toggleDrawer}></i>
          <span class="span-filter">filter</span>
        </span>
        <span className="icon-none">
          <i className="bi bi-grid-fill"></i>
        </span>
        <span className="icon-none">
          <i className="bi bi-list"></i>
        </span>
        <span className="line">|</span>
        <span className="show-page">
          <span className="showing-text">Showing </span>
          1–{itemsToShow2} of {totalitems}
          <span className="results-text"> results</span>
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
