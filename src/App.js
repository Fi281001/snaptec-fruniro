import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Homepage from "./components/Homepage.js";
import Shop from "./components/Shop.js";
import Blog from "./components/Blog.js";
import Contact from "./components/Contact.js";
import { SingleProduct } from "./components/SingleProduct.js";
import Cart from "./components/Cart.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
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
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
