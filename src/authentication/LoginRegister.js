import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import bg from "./bg-login-register.png";
import logo from "../image/logo.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail, // Import phương thức để khôi phục mật khẩu
} from "firebase/auth";

export const LoginRegister = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const customId1 = "custom-id-yes";
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

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [name, setName] = useState("");

  const handlname = () => {
    return email.split("@")[0]; // Trả về phần trước dấu "@"
  };
  const auth = getAuth();

  const saveUserData = (userId, email, name, token) => {
    const db = getDatabase(); // Tạo kết nối tới Firebase Realtime Database
    set(ref(db, "users/" + userId), {
      email: email,
      name: name,
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

    const nameFromEmail = handlname(); // Gọi hàm để lấy tên từ email

    setName(nameFromEmail); // Cập nhật tên

    if (password.length < 6) {
      toast.error("Passwords must be at least 6 characters", {
        toastId: customId1,
      });
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

      if (!token) {
        throw new Error("Token is undefined");
      }

      // Lưu thông tin người dùng vào Firebase Realtime Database
      saveUserData(
        user.uid,
        user.email,
        (user.displayName = nameFromEmail),
        token
      );
      localStorage.setItem("user", token);

      toast.success("Login successfully", {
        toastId: customId1,
      });

      // Điều hướng về trang chủ
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error); // In lỗi ra console
      toast.error("Wrong password or account", {
        toastId: customId1,
      });
    }
  };

  // register
  const handleRegister = (event) => {
    event.preventDefault();

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== passwordAgain) {
      toast.error("Passwords do not match", {
        toastId: customId1,
      });
      return;
    }

    // Thực hiện đăng ký
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Registration successful", {
          toastId: customId1,
        });

        // Chuyển hướng người dùng sau khi đăng ký thành công
        setTimeout(() => {
          setIsActive(false);
        }, 2000);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email is already in use. Please try another one.", {
            toastId: customId1,
          });
        } else {
          toast.error("Error during registration: " + error.message, {
            toastId: customId1,
          });
        }
      });
  };

  // State quản lý form quên mật khẩu || Mặc định false
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  // Hiển thị form quên mật khẩu
  const handleForgotPasswordClick = (event) => {
    setShowForgotPasswordForm(true); // Hiển thị modal
  };

  // Hàm xử lý khi quên mật khẩu
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please enter your email address", {
        toastId: customId1,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Please access your email to reset your password", {
        toastId: customId1,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Error sending password reset email: " + error.message, {
        toastId: customId1,
      });
    }
  };
  const closeModal = () => {
    // Không đóng modal khi submit
    setShowForgotPasswordForm(false); // Comment hoặc xóa để không đóng modal
  };

  return (
    <div>
      <img className="img-bg" src={bg} alt="bg" />
      <div
        className={
          isActive
            ? "container-login-register active"
            : "container-login-register"
        }
        id="container"
      >
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1 className="h1-create-account">Create Account</h1>
            <span>or use your email for registration</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handlname();
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password comfirmed"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <span>or use your email and password</span>
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
            {/* Thêm nút quên mật khẩu */}
            <a href="#forgot-password" onClick={handleForgotPasswordClick}>
              Forgot Your Password?
            </a>
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
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <img className="img-logo" src={logo} alt="" />
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <img className="img-logo" src={logo} alt="" />
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button id="register">Sign Up</button>
            </div>
          </div>
        </div>
        {/* Modal Quên mật khẩu */}
        {showForgotPasswordForm && (
          <div id="forgot-password" className="modal">
            <div className="modal-content">
              <div className="modal-close" onClick={closeModal}>
                &times;
              </div>
              <h3 className="group-text-center">
                <i class="fa fa-lock fa-5x"></i>
              </h3>
              <h2 className="group-text-center">Reset Your Password</h2>
              <div className="group-text-center mb-5px">
                <span>
                  The password reset link will be sent to your email. Please
                  check your email
                </span>
              </div>

              <form className="form-input-reset-password">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" onClick={handleForgotPassword}>
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
