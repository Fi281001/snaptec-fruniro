import React from "react";
import { useEffect } from "react";
export default function ScrollPosition() {
  // Đổi tên component thành ScrollPosition (chữ cái đầu in hoa)
  useEffect(() => {
    // Lưu vị trí cuộn khi người dùng cuộn
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Phục hồi vị trí cuộn khi component được mount
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition"); // Xóa vị trí cuộn sau khi phục hồi
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null; // Không cần render gì ở đây
}
