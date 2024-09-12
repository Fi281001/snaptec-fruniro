import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={1000} />
      <Router>
        <Routes>
          {/* Route cho trang login */}
          <Route path="/login" element={<LoginRegister />} />

          {/* Các route cho các trang chính */}
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
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
      <Routes>
        {/* Route cho các trang chính */}
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
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
