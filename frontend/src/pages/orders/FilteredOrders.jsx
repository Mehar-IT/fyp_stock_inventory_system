import React, { Fragment, useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./filterOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/features/order/orderSlice";
import { getFilteredOrder } from "../../redux/features/order/orderService";
import { Link } from "react-router-dom";
import { departments } from "../../data/sidebar";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SpinnerImg } from "../../components/loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";

const initialState = {
  orderedAt: new Date().toISOString().slice(0, 10),
  orderStatus: "",
  dept: "",
};

const FilteredOrders = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [formData, setformData] = useState(initialState);
  const { orderedAt, orderStatus, dept } = formData;

  const { loading, error, filteredOrders } = useSelector(
    (state) => state.orders
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setformData({ ...formData, [name]: value });
  };
  const columns = [
    { field: "date", headerName: "Ordered At", minWidth: 70, flex: 0.5 },
    // { field: "name", headerName: "Order Name", minWidth: 50, flex: 0.7 },
    {
      field: "dept",
      headerName: "Department",
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <p
            style={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: "#03a5fc",
              padding: "5px",
            }}
          >
            {row.dept}
          </p>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <p
            style={{
              display: "inline",
              fontSize: "17px",
              borderRadius: "10px",
              padding: "5px",
              backgroundColor:
                row.status === "rejected" || row.status === "processing"
                  ? "#fc3838"
                  : "#6ceb79",
              color: "white",
            }}
          >
            {row.status}
          </p>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <span className="deleteButton">
            <Link to={`/order-detail/${row.id}`}>
              <AiOutlineEye size={25} color={"purple"} />
            </Link>
          </span>
        );
      },
    },
  ];
  const rows = [];

  filteredOrders &&
    filteredOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.quantity,
        name: item.name,
        id: item._id,
        status: item.orderStatus,
        dept: item.user.dept,
        date: String(item.orderedAt).substring(0, 10),
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error]);
  useEffect(() => {
    getFilteredOrder(dispatch, dept, orderedAt, orderStatus);
  }, [dept, dispatch, orderStatus, orderedAt]);

  if (loading) {
    return <SpinnerImg />;
  }
  const status = ["processing", "rejected", "accepted", "shipped", "delivered"];
  return (
    <Fragment>
      <h1 id="myOrdersHeading">"Filtere Orders"</h1>
      <div className="filterBox">
        <form className="invoiceForm">
          <label htmlFor="orderedAt">Filter by Date</label>
          <input
            type="date"
            id="orderedAt"
            name="orderedAt"
            value={orderedAt}
            onChange={handleInputChange}
          />
          <label htmlFor="dept">Filter by Department</label>
          <select
            className="filterDept"
            name="dept"
            id="dept"
            value={dept}
            onChange={handleInputChange}
          >
            <option value="">All Departments</option>
            {departments.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor="orderStatus">Filter by Status</label>
          <select
            value={orderStatus}
            name="orderStatus"
            id="orderStatus"
            onChange={handleInputChange}
          >
            <option value="">All Status</option>
            {status.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
        <ReactToPrint
          trigger={() => (
            <button className="printInvoice">Print Invoice</button>
          )}
          content={() => componentRef.current}
          debug={true}
        />
      </div>

      <div className="myOrdersPage" ref={componentRef}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />
      </div>
    </Fragment>
  );
};

export default FilteredOrders;
