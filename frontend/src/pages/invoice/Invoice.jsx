import React from "react";
import "./invoice.css";

const Invoice = React.forwardRef((props, ref) => {
  const { product } = props;

  const user = product?.user;

  return (
    <div className="invoiceContainer" id="container" ref={ref}>
      <div className="brand-section">
        <div className="row">
          <div className="col-6">
            <img
              src="https://itsc.usindh.edu.pk/eportal/includes/assets/icon/usindh_icon.ico"
              alt="unilog"
            />
          </div>
          <div className="col-6">
            <div className="company-details">
              <p className="text-white">This is Digital slip of</p>
              <p className="text-white">Stock Inventory System</p>
              <p className="text-white">University Of Sindh</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body-section">
        <div className="row">
          <div className="col-6">
            <h2 className="heading">Invoice No.{product._id}</h2>
            <p className="sub-heading">Tracking No. fabcart2025</p>
            <p className="sub-heading">
              Order Date:{String(product.createdAt).substring(0, 10)}
            </p>
            <p className="sub-heading">Email Address: {user?.email}</p>
          </div>
          <div className="col-6">
            <p className="sub-heading">Full Name:{user?.name}</p>
            <p className="sub-heading">Address:</p>
            <p className="sub-heading">Phone Number:</p>
            <p className="sub-heading">Bio:{user?.bio}</p>
          </div>
        </div>
      </div>
      <div className="body-section">
        <h3 className="heading">Ordered Items</h3>
        <br />
        <table className="table-bordered">
          <thead>
            <tr>
              <th className="w-20">Product</th>
              <th className="w-20">Category</th>
              <th className="w-20">Price</th>
              <th className="w-20">Quantity</th>
              <th className="w-20">Grandtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right">
                Sub Total
              </td>
              <td>10.XX</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right">
                Tax Total %1X
              </td>
              <td>2</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right">
                Grand Total
              </td>
              <td>12.XX</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3 className="heading ">Approval Status:</h3>
        <h3
          style={{
            display: "inline",
            fontSize: "17px",
            borderRadius: "10px",
            padding: "5px",
            backgroundColor:
              product.status !== "processing" ? "#6ceb79" : "#fc3838",
            color: "white",
          }}
        >
          {product.status}
        </h3>
      </div>
      {/* <div
        style={{
          borderWidth: "6px",
          borderStyle: "solid",
          borderColor: product.status !== "processing" ? "#008000" : "#FF0000",
          borderRadius: "8px",
          color: product.status !== "processing" ? "#008000" : "#FF0000",
          opacity: "0.4",
          zIndex: 1,
          position: "absolute",
          left: "30%",
          top: "30%",
          // transform: "translateX(-50%)",
          fontSize: "30pt",
          WebkitTransform: "rotate(-45deg)",
          msTransform: "rotate(-45deg)",
          transform: "rotate(-45deg)",
          fontFamily:
            '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
        }}
      >
        {product.status}
      </div> */}
      <div className="body-section">
        <p>
          © Copyright 2023 - UOS. All rights reserved.
          <a href="https://usindh.edu.pk/" className="float-right">
            https://usindh.edu.pk/
          </a>
        </p>
      </div>
    </div>
  );
});
export default Invoice;
