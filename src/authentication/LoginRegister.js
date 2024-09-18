import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import bg from "./bg-login-register.png";
import logo from "../image/logo.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
export const LoginRegister = () => {
  const navigate = useNavigate();
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
  const [passwordAgain, setPasswordAgain] = useState("");

  const auth = getAuth();

  const saveUserData = (userId, email, token) => {
    const db = getDatabase(); // Tạo kết nối tới Firebase Realtime Database
    set(ref(db, "users/" + userId), {
      email: email,
      token: token,
    })
      .then(() => {
        console.log("User data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      toast.error("Passwords must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lấy token từ user
      const token = await user.getIdToken();
      console.log("Token:", token); // Kiểm tra token

      if (!token) {
        throw new Error("Token is undefined");
      }

      // Lưu thông tin người dùng vào Firebase Realtime Database
      saveUserData(user.uid, user.email, token);
      localStorage.setItem("user", token);
      toast.success("Login successfully");

      // Điều hướng về trang chủ
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error); // In lỗi ra console
      toast.error("Wrong password or account");
    }
  };

  // register
  const handleRegister = (event) => {
    event.preventDefault();

    // Lấy giá trị từ các input

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== passwordAgain) {
      toast.error("Passwords do not match");
      return;
    }

    // Thực hiện đăng ký
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Đăng ký thành công
        const user = userCredential.user;
        toast.success("Registration successful");

        // Chuyển hướng người dùng sau khi đăng ký thành công
        setTimeout(() => {
          // navigate("/"); // Chuyển về trang chủ
          setIsActive(false);
        }, 2000);
      })
      .catch((error) => {
        // Xử lý các lỗi khi đăng ký
        if (error.code === "auth/email-already-in-use") {
          // Email đã tồn tại
          toast.error("Email is already in use. Please try another one.");
        } else {
          // Xử lý các lỗi khác
          toast.error("Error during registration: " + error.message);
        }
      });
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
          <form onSubmit={handleRegister}>
            <h1 className="h1-create-account">Create Account</h1>
            <span>or use your email for registeration</span>
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
            <input
              type="password"
              placeholder="Password again"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#5">Forget Your Password?</a>
            <button type="submit">Sign In</button>
            <span className="span-orSignInUsing">Or Sign In Using: </span>
            <div className="social-icons">
              <a href="#1" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#2" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#3" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#4" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
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
