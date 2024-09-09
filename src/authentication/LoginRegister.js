import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import bg from "./bg-login-register.png";
import logo from "../image/logo.png";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
export const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      setIsActive(true);
    });

    loginBtn.addEventListener("click", () => {
      setIsActive(false);
    });
  }, []);

  ///login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Tạo một ref đến nơi lưu trữ thông tin người dùng trong Realtime Database
      const usersRef = database.ref("users");

      // Lấy tất cả người dùng và kiểm tra email và mật khẩu
      const snapshot = await usersRef.once("value");
      const users = snapshot.val();

      let isValidUser = false;

      for (let key in users) {
        if (users[key].email === email && users[key].password === password) {
          isValidUser = true;
          break;
        }
      }

      if (isValidUser) {
        // Chuyển hướng đến trang chính nếu đăng nhập thành công
        navigate("/");
      } else {
        // Hiển thị lỗi nếu thông tin đăng nhập không hợp lệ
        setError(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu."
        );
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      setError("Đã xảy ra lỗi: " + error.message);
    }
  };
  return (
    <div>
      <img className="img-bg" src={bg} alt="bg" />
      <div
        class={
          isActive
            ? "container-login-register active"
            : "container-login-register"
        }
        id="container"
      >
        {/* <img src={bg} alt="bg"/> */}
        <div class="form-container sign-up">
          <form>
            <h1 className="h1-create-account">Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form>
            <h1>Sign In</h1>

            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#5">Forget Your Password?</a>
            <button>Sign In</button>
            <span className="span-orSignInUsing">Or Sign In Using: </span>
            <div class="social-icons">
              <a href="#1" class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#2" class="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#3" class="icon">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#4" class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <img className="img-logo" src={logo} alt="" />
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button class="hidden" id="login">
                Sign In
              </button>
            </div>
            <div class="toggle-panel toggle-right">
              <img className="img-logo" src={logo} alt="" />
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button class="hidden" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
