import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./userList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SideBar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { SET_USERS, selectUsers } from "../../redux/features/auth/authSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAllUsers, deleteUserByAdmin } from "../../services/authService";

// import { reset as userReset } from "../../redux/adminSlice/allUserSlice";
// import { reset as deleteUserReset } from "../../redux/adminSlice/deleteUserSlice";

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    // const navigate = useNavigate();

    // const alert = useAlert();

    // const { error, users } = useSelector((state) => state.auth);

    // const {
    //     error: deleteError,
    //     isDeleted,
    //     message,
    // } = useSelector((state) => state.deleteUser);

    // const deleteUserHandler = (id) => {
    //     deleteUser(dispatch, id);
    // };
    useEffect(() => {

        const getuser = async () => {

            const data = await getAllUsers()


            dispatch(SET_USERS(data));
            // return data
        }
        getuser()
    }, [dispatch, users])
    // useEffect(() => {
    //     if (error) {
    //         // alert.error(error);
    //         dispatch(userReset());
    //     }

    //     if (deleteError) {
    //         // alert.error(deleteError);
    //         dispatch(deleteUserReset());
    //     }

    //     if (isDeleted) {
    //         // alert.success(message);
    //         navigate("/admin/users");
    //         dispatch(deleteUserReset());
    //     }

    //     getAllUsers(dispatch);
    // }, [dispatch, error, deleteError, navigate, isDeleted, message]);

    const confirmDelete = (id) => {


        confirmAlert({
            title: "Delete Product",
            message: "Are you sure you want to delete this product.",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => deleteUserByAdmin(id),
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
                        className={` badge ${row.bio === "admin" ? "greenColor" : "redColor"
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
                            <FaEdit size={20}
                                color={"green"} />
                        </Link>
                        <FaTrashAlt
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
                bio: item.bio,
                email: item.email,
                name: item.name,
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
