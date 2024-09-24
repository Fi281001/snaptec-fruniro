import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    // Hiển thị modal yêu cầu đăng nhập bằng SweetAlert2
    Swal.fire({
      title: "Yêu cầu đăng nhập",
      text: "Bạn cần đăng nhập để truy cập trang này.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng nhập",
      cancelButtonText: "Đóng",
    }).then((result) => {
      if (result.isConfirmed) {
        // Chuyển hướng đến trang đăng nhập nếu người dùng chọn 'Đăng nhập'
        window.location.href = "/login";
      }
    });

    // Dừng hiển thị trang con cho đến khi người dùng xác nhận
    return null;
  }

  // Nếu đã đăng nhập, cho phép truy cập vào trang con
  return children;
};

export default PrivateRoute;
