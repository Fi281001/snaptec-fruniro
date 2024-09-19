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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pricesale, setPricesale] = useState("");
  const [sale, setSale] = useState("");
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");

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

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      pricesale: "",
      sale: "",
      title: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Required")
        .min(4, "Please enter more than 4 characters")
        .matches(
          /^[a-zA-Z_0-9]{3,20}$/,
          "Please do not enter more than 20 characters"
        ),
      price: yup
        .string()
        .required("Required")
        .matches(
          /\d{0,8}[.]?\d{1,4}$/,
          "Please do not enter spaces and characters"
        ),
      sale: yup
        .string()
        .matches(
          /^([0-9]|[1-9][0-9]|100)$/,
          "Please enter a number from 0 to 100"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //write
  const writeToDatabase = async () => {
    const imgRef = storageRef(imageDB, `images/${v4()}`);
    await uploadBytes(imgRef, imgSrc);

    //Lấy ra URL image từ storage
    const downloadURL = await getDownloadURL(imgRef);

    setImgSrc(downloadURL);

    let id = length - 1 + 1;
    set(ref(database, `product/${id}`), {
      id,
      imgSrc: downloadURL,
      name: formik.values.name,
      price: formik.values.price,
      pricesale: formik.values.pricesale,
      sale: formik.values.sale,
      title: formik.values.title,
    })
      .then(() => {
        const customId = "custom-id-yes";
        toast.success("Data added successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          toastId: customId,
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
    setName("");
    setPrice("");
    setPricesale("");
    setSale("");
    setTitle("");
  };
  console.log(imgSrc);
  //update
  //delete
  return (
    <>
      <div className="container-dashboard">
        <div className="container-dashboard__title">Add Product</div>
        <form className="group-form" onSubmit={formik.handleSubmit}>
          <div className="input-box">
            <span className="details">Name Product</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name product..."
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <p className="error-message">{formik.errors.name}</p>
            )}
          </div>
          <div className="input-box">
            <span className="details">Sale</span>
            <input
              name="sale"
              id="sale"
              placeholder="Enter sale..."
              value={formik.values.sale}
              onChange={formik.handleChange}
            />
            {formik.errors.sale && (
              <p className="error-message">{formik.errors.sale}</p>
            )}
          </div>
          <div className="input-box">
            <span className="details">Price Product</span>
            <input
              name="price"
              id="price"
              placeholder="Enter price product..."
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <p className="error-message">{formik.errors.price}</p>
            )}
          </div>
          <div className="input-box">
            <span className="details">Price Sale</span>
            <input
              disabled
              name="pricesale"
              id="pricesale"
              placeholder="Enter price sale..."
              value={formik.values.pricesale}
              onChange={formik.handleChange}
            />
          </div>
          <div className="input-box-title">
            <span className="details">Title Product</span>
            <textarea
              type="text"
              name="title"
              id="title"
              placeholder="Enter title product..."
              value={formik.values.title}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="input-box-path-image">
            <input type="file" onChange={(e) => setImgSrc(e.target.files[0])} />
            <img className="display-img" alt="" src={imgSrc} />
          </div>
          <div className="div-button-add">
            <button
              className="button-add"
              type="submit"
              onClick={writeToDatabase}
            >
              Add Product
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
