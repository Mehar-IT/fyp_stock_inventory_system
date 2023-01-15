import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./userList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  SET_USERS,
  selectUsers,
  SET_USER_DELETED,
  selectUserDeleted,
} from "../../redux/features/auth/authSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAllUsers, deleteUserByAdmin } from "../../services/authService";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isDeleted = useSelector(selectUserDeleted);
  const navigate = useNavigate();

  useEffect(() => {
    const getuser = async () => {
      const data = await getAllUsers();
      dispatch(SET_USERS(data));
      // return data
    };
    getuser();
    if (isDeleted) {
      toast.success("user is deleted");
      dispatch(SET_USER_DELETED(false));
    }
  }, [dispatch, navigate, isDeleted]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            await deleteUserByAdmin(id);
            dispatch(SET_USER_DELETED(true));
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
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "bio",
      headerName: "Bio",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      renderCell: ({ row }) => {
        return (
          <p
            className={` badge ${
              row.bio === "admin" ? "greenColor" : "redColor"
            } `}
          >
            {row.bio}
          </p>
        );
      },
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
            <Link to={`/edit-profile/${row.id}`}>
              <FaEdit size={20} color={"green"} />
            </Link>
            <FaTrashAlt
              className="deleteButton"
              size={20}
              color={"red"}
              onClick={() => confirmDelete(row.id)}
            />
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        bio: item.bio,
      });
    });

  return (
    <Fragment>
      {/* <MetaData title={`ALL USERS - Admin`} /> */}

      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
