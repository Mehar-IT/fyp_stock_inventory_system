import React from "react";
import "./invoice.css";

const OrderInvoice = React.forwardRef((props, ref) => {
  const { order } = props;

  const user = order?.user;

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
            <h2 className="heading">Invoice No.{order._id}</h2>
            <p className="sub-heading">Tracking No. fabcart2025</p>
            <p className="sub-heading">
              Order Date:{String(order.createdAt).substring(0, 10)}
            </p>
            <p className="sub-heading">Email Address: {user?.email}</p>
          </div>
          <div className="col-6">
            <p className="sub-heading">Full Name:{user?.name}</p>
            <p className="sub-heading">Address:</p>
            <p className="sub-heading">Phone Number:</p>
          </div>
        </div>
      </div>
      <div className="body-section">
        <h3 className="heading">Ordered Items</h3>
        <br />
        <table className="table-bordered">
          <thead>
            <tr>
              <th className="w-20">Name</th>
              <th className="w-20">Product</th>
              <th className="w-20">Quantity</th>
              <th className="w-20">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.name}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.description}</td>
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
              order.orderStatus !== "processing" ? "#6ceb79" : "#fc3838",
            color: "white",
          }}
        >
          {order.orderStatus}
        </h3>
      </div>

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
export default OrderInvoice;
