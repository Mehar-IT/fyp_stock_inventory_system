import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  users: [],
  userDetail: {},
  isDeleted: false,
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
    dept: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      // localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;

      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
      state.user.dept = profile.dept;
    },
    SET_USERS(state, action) {
      state.users = action.payload.users;
    },
    SET_USER_DETAIL(state, action) {
      state.userDetail = action.payload.user;
    },
    SET_USER_DELETED(state, action) {
      state.isDeleted = action.payload;
    },
  },
});

export const {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  SET_USERS,
  SET_USER_DETAIL,
  SET_USER_DELETED,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectUsers = (state) => state.auth.users;
export const selectUserDetail = (state) => state.auth.userDetail;
export const selectUserDeleted = (state) => state.auth.isDeleted;

export default authSlice.reducer;
