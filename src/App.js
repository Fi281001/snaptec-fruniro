import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Homepage from "./components/Homepage.js";
import Shop from "./components/Shop.js";
// import Blog from "./components/Blog.js";
// import Contact from "./components/Contact.js";
import { SingleProduct } from "./components/SingleProduct.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          {/* <Route path="/Blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/single-product" element={<SingleProduct />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
