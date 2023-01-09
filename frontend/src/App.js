import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import ProtectedRoute from './components/Route/ProtectedRoute'
import { selectUser } from './redux/features/auth/authSlice'
import UsersList from "./components/userList/UserList";
import EditProfileByAdmin from "./pages/editProfileByAdmin/EditProfileByAdmin";


axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectUser)

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  const roles = ['admin', 'superAdmin']
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/" element={<Home />} />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isLoggedIn}
              adminRoute={true}
              // isAdmin={user && user.bio === "admin" ? true : false}
              isAdmin={roles.includes(user.bio)}
            />
          }
        >

          <Route
            path="/dashboard"
            element={
              <Sidebar>
                <Layout>
                  <Dashboard />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/add-product"
            element={
              <Sidebar>
                <Layout>
                  <AddProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Sidebar>
                <Layout>
                  <ProductDetail />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <Sidebar>
                <Layout>
                  <EditProfile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/profile"
            element={
              <Sidebar>
                <Layout>
                  <Profile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Sidebar>
                <Layout>
                  <Contact />
                </Layout>
              </Sidebar>
            }
          />
        </Route>



        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isLoggedIn}
              superAdmin={true}
              isAdmin={user && user.bio === "superAdmin" ? true : false}
            />
          }
        >

          <Route
            path="/edit-product/:id"
            element={
              <Sidebar>
                <Layout>
                  <EditProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/edit-profile/:id"
            element={
              <Sidebar>
                <Layout>
                  <EditProfileByAdmin />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/user-list"
            element={
              <Sidebar>
                <Layout>
                  <UsersList />
                </Layout>
              </Sidebar>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
