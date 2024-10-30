import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Homepage from "./components/Homepage.js";
import Shop from "./components/Shop.js";
import Blog from "./components/Blog.js";
import Contact from "./components/Contact.js";
import { SingleProduct } from "./components/SingleProduct.js";
import Cart from "./components/Cart.js";
import PrivateRoute from "./components/PrivateRoute.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Errorpage from "./components/Errorpage.js";
import { LoginRegister } from "./authentication/LoginRegister.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard.js";
import Routerposition from "./components/Routerposition.js";
import Checkout from "./components/Checkout.js";
import Compare from "./components/Compare.js";
import Comparison from "./components/Comparison.js";
import { useDispatch } from "react-redux";
import { syncCartFromLocal } from "./redux/CartSlice.js";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Khi khởi động ứng dụng, khôi phục giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cartlogin")) || [];
    dispatch(syncCartFromLocal(storedCart)); // Đồng bộ giỏ hàng với Redux
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={1000} />
      <Router>
        <Routerposition />
        <Routes>
          {/* Route cho trang login */}
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Các route cho các trang chính */}
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/compare/:productId" element={<Compare />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/single-product/:productId"
              element={<SingleProduct />}
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Route cho trang lỗi, không có Header và Footer */}
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Router>
    </div>
  );
}

// Component Layout
const Layout = () => {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "*";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routerposition />
      <Routes>
        {/* Route cho các trang chính */}
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/compare/:productId" element={<Compare />} />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
