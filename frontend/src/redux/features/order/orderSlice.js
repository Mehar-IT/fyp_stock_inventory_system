import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: true,
  error: "",
  order: [],
  isDeleted: false,
  isUpdated: false,
  orderDetail: {},
};

const filterSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrdersLoad: (state) => {
      state.loading = true;
    },
    getOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderDeleteLoad: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    orderDeleteSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    orderDeleteFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailLoad: (state) => {
      state.loading = true;
    },
    orderDetailSuccess: (state, action) => {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    orderDetailFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderUpdateLoad: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    orderUpdateSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    orderUpdateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    submitOrderLoad: (state) => {
      state.loading = true;
    },
    submitOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    submitOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.loading = false;
      state.error = "";
    },
    reset: () => initialState,
  },
});

export const {
  getOrdersLoad,
  getOrdersSuccess,
  getOrdersFailed,
  reset,
  clearError,
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
} = filterSlice.actions;
export default filterSlice.reducer;
