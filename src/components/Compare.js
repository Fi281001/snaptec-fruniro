import React, { useEffect, useState } from "react";
import "../main/Compare.css";
import Rectangle from "./Rectangle";
import Frame from "./Frame";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: 600, // Sửa max-height thành maxHeight
  overflowY: "auto",
  borderRadius: 4,
  paddingRight: "40px",
};
const Compare = () => {
  const [products, setProducts] = useState([]);
  const { productId } = useParams();
  const id = Number(productId);
  useEffect(() => {
    // Hàm để lấy dữ liệu từ Firebase qua axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://furino-2343b-default-rtdb.firebaseio.com/product.json"
        );
        if (response.data) {
          const x = response.data;
          const validProducts = x.filter(
            (item) => item !== null && item !== undefined
          );
          setProducts(validProducts);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const [product1, setProduct1] = useState("");
  function handleProduct() {
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
      setProduct1(foundProduct); // Gán sản phẩm tìm thấy vào state product1
    } else {
      console.log("Product not found");
    }
  }
  useEffect(() => {
    handleProduct();
  }, [products]);

  const [product2, setProduct2] = useState("");
  const handleProduct2 = (id) => {
    console.log("sss", id);
    const tem = Number(id);
    const foundProduct = products.find((product) => product.id === tem);
    setProduct2(foundProduct);
    handleClose();
  };
  // modals
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Rectangle title="Product Comparison" />
      {/* {chooseProduct()} */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modals-containar">
            <h3 className="title-modal">Choose a Product</h3>
            {products.map((product) => (
              <div key={product.id}>
                <img src={product.imgSrc} alt={product.name} />
                <div className="item-span">
                  <span>{product.name}</span>
                  <span>{product.title}</span>
                  <span>{product.pricesale}</span>
                </div>
                <button
                  className="conpare-but"
                  onClick={() => {
                    handleProduct2(product.id);
                  }}
                >
                  Compare
                </button>
              </div>
            ))}
          </div>

          <button className="bt-modals" onClick={handleClose}>
            Đóng
          </button>
        </Box>
      </Modal>
      <div className="container-compare">
        <div className="group-1">
          <span>Go to Product page for more Products</span>
          <Link to="/shop">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="group-2">
          <img src={product1.imgSrc} alt="" />
          <span>{product1.name}</span>
          <p>Rs. {product1.pricesale}</p>
          <div className="group-start">
            <p>4</p>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-dash-lg"></i>
            <p className="number-review">240 review</p>
          </div>
        </div>
        <div className="group-3">
          {product2 ? ( // Kiểm tra xem product2 có giá trị hay không
            <>
              <img src={product2.imgSrc} alt={product2.name} />
              <span>{product2.name}</span>
              <p>Rs. {product2.pricesale}</p>
              <div className="group-start">
                <p>4</p>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-dash-lg"></i>
                <p className="number-review">240 review</p>
              </div>
            </>
          ) : (
            <p
              style={{
                color: "red",
                paddingTop: "20px",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Please select product
            </p> // Thông báo nếu chưa chọn sản phẩm
          )}
        </div>
        <div className="group-4">
          {/* <span>Add A Porduct</span> */}
          <button className="bt-b" onClick={handleOpen}>
            Choose a Product
          </button>
        </div>
      </div>
      {/* General */}
      <div className="compare-table">
        <table className="compare-table__table">
          <tr>
            <th className="compare-table__th">General</th>
            <th className="compare-table__th-td"></th>
            <th className="compare-table__th-td"></th>
          </tr>
          <tr>
            <td>Sales Package</td>
            <td>1 sectional sofa</td>
            <td>1 Three Seater, 2 Single Seater</td>
            <td></td>
          </tr>
          <tr>
            <td>Model Number</td>
            <td>TFCBLIGRBL6SRHS</td>
            <td>DTUBLIGRBL568</td>
            <td></td>
          </tr>
          <tr>
            <td>Secondary Material</td>
            <td>Solid Wood</td>
            <td>Solid Wood</td>
            <td></td>
          </tr>
          <tr>
            <td>Configuration</td>
            <td>L-shaped</td>
            <td>L-shaped</td>
            <td></td>
          </tr>
          <tr>
            <td>Upholstery Material</td>
            <td>Fabric + Cotton</td>
            <td>Fabric + Cotton</td>
            <td></td>
          </tr>
          <tr>
            <td>Upholstery Color</td>
            <td>Bright Grey & Lion</td>
            <td>Bright Grey & Lion</td>
            <td></td>
          </tr>
          {/* Products */}
          <tr>
            <th className="compare-table__th">Product </th>
            <th className="compare-table__th-td"></th>
            <th className="compare-table__th-td"></th>
          </tr>
          <tr>
            <td>Filling Material</td>
            <td>Foam</td>
            <td>Matte</td>
            <td></td>
          </tr>
          <tr>
            <td>Finish Type</td>
            <td>Bright Grey & Lion</td>
            <td>Bright Grey & Lion</td>
            <td></td>
          </tr>
          <tr>
            <td>Adjustable Headrest</td>
            <td>No</td>
            <td>Yes</td>
            <td></td>
          </tr>
          <tr>
            <td>Maximum Load Capacity</td>
            <td>280 KG</td>
            <td>300 KG</td>
            <td></td>
          </tr>
          <tr>
            <td>Origin of Manufacture</td>
            <td>India</td>
            <td>India</td>
            <td></td>
          </tr>

          {/* Dimensions */}
          <tr>
            <th className="compare-table__th">Dimensions </th>
            <th className="compare-table__th-td"></th>
            <th className="compare-table__th-td"></th>
          </tr>
          <tr>
            <td>Width</td>
            <td>265.32 cm</td>
            <td>265.32 cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Height</td>
            <td>76 cm</td>
            <td>76 cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>167.76 cm</td>
            <td>167.76 cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>45 KG</td>
            <td>65 KG</td>
            <td></td>
          </tr>
          <tr>
            <td>Seat Height</td>
            <td>41.52 cm</td>
            <td>41.52 cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Leg Height</td>
            <td>5.46 cm</td>
            <td>5.46 cm</td>
            <td></td>
          </tr>

          {/* Dimensions */}
          <tr>
            <th className="compare-table__th">Warranty </th>
            <th className="compare-table__th-td"></th>
            <th className="compare-table__th-td"></th>
          </tr>
          <tr>
            <td>Warranty Summary</td>
            <td>1 Year Manufacturing Warranty</td>
            <td>1.2 Year Manufacturing Warranty</td>
            <td></td>
          </tr>
          <tr>
            <td>Warranty Service Type</td>
            <td>
              For Warranty Claims or Any Product Related Issues Please Email at
              operations@trevifurniture.com
            </td>
            <td>
              For Warranty Claims or Any Product Related Issues Please Email at
              support@xyz.com
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Covered in Warranty</td>
            <td>Warranty Against Manufacturing Defect</td>
            <td>
              Warranty of the product is limited to manufacturing defects only.
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Not Covered in Warranty</td>
            <td>
              The Warranty Does Not Cover Damages Due To Usage Of The Product
              Beyond Its Intended Use And Wear & Tear In The Natural Course Of
              Product Usage.
            </td>
            <td>
              The Warranty Does Not Cover Damages Due To Usage Of The Product
              Beyond Its Intended Use And Wear & Tear In The Natural Course Of
              Product Usage.
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Domestic Warranty</td>
            <td>1 Year</td>
            <td>3 Months</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <buttuon className="button-add-to-cart">Add To Cart</buttuon>
            </td>
            <td>
              <buttuon className="button-add-to-cart">Add To Cart</buttuon>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
      <Frame />
    </>
  );
};

export default Compare;
