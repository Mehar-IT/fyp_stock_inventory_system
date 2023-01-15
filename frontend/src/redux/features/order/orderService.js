import axios from "axios";
import { toast } from "react-toastify";
import {
  getOrdersLoad,
  getOrdersSuccess,
  getOrdersFailed,
  orderDeleteLoad,
  orderDeleteSuccess,
  orderDeleteFailed,
  orderDetailLoad,
  orderDetailSuccess,
  orderDetailFailed,
  orderUpdateLoad,
  orderUpdateSuccess,
  orderUpdateFailed,
  submitOrderLoad,
  submitOrderSuccess,
  submitOrderFailed,
} from "./orderSlice";

// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const BACKEND_URL = "http://127.0.0.1:5000/api";

// Register User
export const getOrders = async (dispatch) => {
  try {
    dispatch(getOrdersLoad());
    const response = await axios.get(`${BACKEND_URL}/orders/me`);

    dispatch(getOrdersSuccess(response.data.orders));
  } catch (error) {
    dispatch(getOrdersFailed(error.data.message));
  }
};
export const getAdminOrders = async (dispatch) => {
  try {
    dispatch(getOrdersLoad());
    const response = await axios.get(`${BACKEND_URL}/admin/orders`);

    dispatch(getOrdersSuccess(response.data.orders));
  } catch (error) {
    dispatch(getOrdersFailed(error.data.message));
  }
};

export const deleteOrder = async (dispatch, id) => {
  try {
    dispatch(orderDeleteLoad());
    const response = await axios.delete(`${BACKEND_URL}/admin/order/${id}`);

    dispatch(orderDeleteSuccess(response.data.success));
  } catch (error) {
    dispatch(orderDeleteFailed(error.data.message));
  }
};

export const getOrderDetail = async (dispatch, id) => {
  try {
    dispatch(orderDetailLoad());
    const response = await axios.get(`${BACKEND_URL}/order/${id}`);

    dispatch(orderDetailSuccess(response.data.order));
  } catch (error) {
    dispatch(orderDetailFailed(error.data.message));
  }
};
export const orderUpdate = async (dispatch, id, data) => {
  try {
    dispatch(orderUpdateLoad());
    const response = await axios.put(`${BACKEND_URL}/admin/order/${id}`, data);
    toast.success("order is updated");
    dispatch(orderUpdateSuccess(response.data.success));
  } catch (error) {
    dispatch(orderUpdateFailed(error.response.data.message));
  }
};

export const submitOrder = async (dispatch, data) => {
  try {
    dispatch(submitOrderLoad());
    const response = await axios.post(`${BACKEND_URL}/order/new`, data);

    dispatch(submitOrderSuccess(response.data.success));
  } catch (error) {
    dispatch(submitOrderFailed(error.response.data.message));
  }
};
