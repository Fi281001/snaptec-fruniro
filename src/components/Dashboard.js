import React, { useEffect } from "react";
import "../main/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { imageDB, database } from "../firebase";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function Dashboard() {
  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState(null);
  const [priceSale, setPriceSale] = useState(0); // Thêm state cho pricesale

  /* Lấy độ dài của product để set id*/
  const [length, setLenght] = useState("");
  useEffect(() => {
    // Hàm để lấy dữ liệu từ Firebase qua axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://furino-2343b-default-rtdb.firebaseio.com/product.json"
        );
        if (response.data) {
          setLenght(response.data.length);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  /* formik and yup validation messeage*/
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      pricesale: 0,
      sale: "",
      title: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(4, "Please enter more than 4 characters")
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÁẠẢÃÂẦẤẬẨẪÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸýỳỵỷỹ0-9\s\-\$]{1,50}$/,
          "Please do not enter more than 20 characters"
        ),
      price: yup
        .string()
        .max(10, "Please do not enter more than 10 numbers")
        .matches(
          /^(0|[1-9][0-9]{0,8}|1000000000)$/,
          "Please do not enter spaces and characters"
        ),
      sale: yup
        .string()
        .matches(
          /^(100|[1-9]?[0-9])$/,
          "Please enter a number from 0 to 100 and do not space"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Hàm tính giá sau khi giảm
  const calculatePriceSale = () => {
    const priceValue = parseFloat(formik.values.price) || 0; // Chuyển đổi sang số
    const saleValue = parseFloat(formik.values.sale) || 0; // Chuyển đổi sang số
    const pricesale = (priceValue * (100 - saleValue)) / 100; // Tính giá sau khi giảm
    formik.setFieldValue("pricesale", pricesale); // Cập nhật giá vào formik
  };
  useEffect(() => {
    calculatePriceSale();
  }, [formik.values.price, formik.values.sale]);
  /*write*/
  const writeToDatabase = async () => {
    // Kiểm tra xem người dùng đã nhập tất cả các trường cần thiết chưa
    const { name, price, title, sale } = formik.values;
    if (!name || !price || !title || !sale) {
      const customId = "custom-id-yes";
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: customId,
      });
      return; // Dừng lại nếu có trường thiếu
    }

    // Kiểm tra xem ảnh có định dạng hợp lệ không
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!image || !validImageTypes.includes(image.type)) {
      toast.error("Please upload an image file (png, jpg, jpeg, gif).", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return; // Dừng lại nếu tệp không phải là hình ảnh hợp lệ
    }

    const imgRef = storageRef(imageDB, `images/${v4()}`);
    await uploadBytes(imgRef, image);

    // Lấy ra URL image từ storage
    const downloadURL = await getDownloadURL(imgRef);
    console.log(downloadURL);
    setImgSrc(downloadURL);

    // Tính pricesale
    const priceValue = parseFloat(formik.values.price); // Chuyển đổi giá sang số
    const saleValue = parseFloat(formik.values.sale); // Chuyển đổi tỷ lệ giảm sang số
    const pricesale = (priceValue * (100 - saleValue)) / 100; // Tính giá sau khi giảm
    setPriceSale(pricesale);

    let id = length - 1 + 1;

    // Lưu sản phẩm vào Firebase
    set(ref(database, `product/${id}`), {
      id,
      imgSrc: downloadURL,
      name: formik.values.name,
      price: formik.values.price,
      pricesale: pricesale,
      sale: formik.values.sale,
      title: formik.values.title,
    })
      .then(() => {
        const customId1 = "custom-id-yes";
        toast.success("Data added successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          toastId: customId1,
        });
      })
      .catch(() => {
        toast.error("Error Added Data", {
          position: "right-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    // window.location.reload(); // Reload lại trang
  };

  // Hàm xử lý khi người dùng chọn file
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên được chọn
    if (file) {
      setImage(file); // Lưu trữ tệp vào state image

      // Sử dụng FileReader để tạo URL ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result); // Cập nhật state URL để render
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng Data URL
    }
  };

  return (
    <>
      <div class="formbold-main-wrapper">
        <div class="formbold-form-wrapper">
          <div className="formbold-title-product">Add New Product</div>
          <form onSubmit={formik.handleSubmit}>
            <div class="formbold-input-flex">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  class="formbold-form-input"
                />
                {formik.errors.name && (
                  <p className="error-message">{formik.errors.name}</p>
                )}
                <label for="firstname" class="formbold-form-label">
                  Name Product
                </label>
              </div>
              <div>
                <input
                  name="sale"
                  id="sale"
                  value={formik.values.sale}
                  onChange={formik.handleChange}
                  class="formbold-form-input"
                />
                {formik.errors.sale && (
                  <p className="error-message">{formik.errors.sale}</p>
                )}
                <label for="lastname" class="formbold-form-label">
                  Sale
                </label>
              </div>
            </div>

            <div class="formbold-input-flex">
              <div>
                <input
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  class="formbold-form-input"
                />
                {formik.errors.price && (
                  <p className="error-message">{formik.errors.price}</p>
                )}
                <label for="email" class="formbold-form-label">
                  Price Product
                </label>
              </div>
              <div>
                <input
                  disabled
                  name="pricesale"
                  id="pricesale"
                  value={formik.values.pricesale.toFixed(2)}
                  onChange={formik.handleChange}
                  class="formbold-form-input"
                />
                <label for="phone" class="formbold-form-label">
                  Price Sale
                </label>
              </div>
            </div>

            <div class="formbold-textarea">
              <textarea
                rows="3"
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                class="formbold-form-input"
              ></textarea>
              <label for="message" class="formbold-form-label">
                Title
              </label>
            </div>

            <div className="input-box-path-image">
              <input type="file" required onChange={handleImageChange} />
              {imgSrc && (
                <img
                  className="display-img"
                  src={imgSrc}
                  alt="Preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                    borderradius: "50%",
                  }}
                />
              )}
            </div>
            <div className="btn-center">
              <button
                className="formbold-btn"
                type="submit"
                onClick={writeToDatabase}
              >
                Add Product
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
