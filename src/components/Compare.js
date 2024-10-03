import React from "react";
import "../main/Compare.css";
import Rectangle from "./Rectangle";
import Frame from "./Frame";
import { Link } from "react-router-dom";
const Compare = () => {
  return (
    <>
      <Rectangle title="Product Comparison" />
      <div className="container-compare">
        <div className="group-1">
          <span>Go to Product page for more Products</span>
          <Link to="/shop">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="group-2">
          <img
            src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Asgaard Sofa</span>
          <p>Rs. 250,000.00</p>
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
          <img
            src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Asgaard Sofa</span>
          <p>Rs. 250,000.00</p>
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
        <div className="group-4">
          {/* <span>Add A Porduct</span> */}
          <select className="select-product">
            <option value="0">Choose a Product</option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
          </select>
        </div>
      </div>

      {/* General */}
      <div className="compare-table">
        <table>
          <tr>
            <th>General</th>
            <th></th>
            <th></th>
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
            <th className="margin-top-th">Product </th>
            <th></th>
            <th></th>
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
            <th className="margin-top-th">Dimensions </th>
            <th></th>
            <th></th>
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
            <th className="margin-top-th">Warranty </th>
            <th></th>
            <th></th>
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
