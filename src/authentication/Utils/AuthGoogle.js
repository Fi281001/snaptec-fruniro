// Import GoogleAuthProvider để hỗ trợ đăng nhập bằng Google
//Import signInWithPopup để đăng nhập bằng popup
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthGoogle = async (auth, saveUserData, navigate) => {
  const provider = new GoogleAuthProvider(); // Khởi tạo provider Google
  try {
    // Đăng nhập bằng Google Popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    console.log("User info:", user);
    console.log("Token của bạn là:", token);

    // Lưu thông tin người dùng vào Firebase Realtime Database
    saveUserData(user.uid, user.email, user.displayName, token);
    localStorage.setItem("user", token);

    // Điều hướng về trang chủ
    navigate("/");
  } catch (error) {
    console.error("Google Sign-In error:", error);
  }
};
