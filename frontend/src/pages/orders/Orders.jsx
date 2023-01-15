import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./orders.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/features/order/orderSlice";
import {
  getOrders,
  deleteOrder,
  getAdminOrders,
} from "../../redux/features/order/orderService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SpinnerImg } from "../../components/loader/Loader";
import { AiOutlineEye } from "react-icons/ai";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders, isDeleted } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            deleteOrder(dispatch, id);
          },
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const columns = [
    // { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.7 },
    { field: "name", headerName: "Order Name", minWidth: 50, flex: 0.7 },
    {
      field: "dept",
      headerName: "Department",
      minWidth: 150,
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
      minWidth: 100,
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
          <Fragment>
            <span className="deleteButton">
              <Link to={`/order-detail/${row.id}`}>
                <AiOutlineEye size={25} color={"purple"} />
              </Link>
            </span>
            {user.bio === "superAdmin" && (
              <>
                <Link to={`/edit-order/${row.id}`}>
                  <FaEdit size={20} color={"green"} />
                </Link>
                <FaTrashAlt
                  className="deleteButton"
                  size={20}
                  color={"red"}
                  onClick={() => confirmDelete(row.id)}
                />
              </>
            )}
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.quantity,
        name: item.name,
        id: item._id,
        dept: item.user.dept,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(reset());
    }
    if (isDeleted) {
      getAdminOrders(dispatch);
    }

    user.bio === "superAdmin" ? getAdminOrders(dispatch) : getOrders(dispatch);
  }, [dispatch, error, user.bio, isDeleted]);
  if (loading) {
    return <SpinnerImg />;
  }
  return (
    <Fragment>
      <h1 id="myOrdersHeading">
        {user.bio === "superAdmin" ? "All Orders" : `${user.name}'s Orders`}
      </h1>
      <div className="myOrdersPage">
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

export default Orders;
