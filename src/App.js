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
import { LoginRegister } from "./authentication/LoginRegister.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Errorpage from "./components/Errorpage.js";

function App() {
  // Các trang mà không cần hiển thị Header và Footer

  const Layout = () => {
    const location = useLocation();

    // Các trang mà không cần hiển thị Header và Footer
    const hideHeaderFooter = location.pathname === "*";

    return (
      <>
        {!hideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/single-product/:productId"
            element={<SingleProduct />}
          />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD

          <Route path="*" element={<Errorpage />} />
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </>
    );
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />} />
=======
          <Route path="/loginregister" element={<LoginRegister />} />
>>>>>>> db4d984778e2f6850082fec46a8701b9f99b41ee
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
