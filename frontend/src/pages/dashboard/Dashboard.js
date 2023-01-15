import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAllProducts } from "../../redux/features/product/productSlice";
import { getOrders } from "../../redux/features/order/orderService";
import Charts from "../../components/charts/Charts.jsx";
import { getAllUsers } from "../../services/authService";
import { SET_USERS } from "../../redux/features/auth/authSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isError, message } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    const getuser = async () => {
      const data = await getAllUsers();
      dispatch(SET_USERS(data));
      // return data
    };

    if (isLoggedIn === true) {
      dispatch(getAllProducts());
      getOrders(dispatch);
      getuser();
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  const processing = orders.filter((item) =>
    item.orderStatus.includes("processing")
  );
  const accepted = orders.filter((item) =>
    item.orderStatus.includes("accepted")
  );
  const rejected = orders.filter((item) =>
    item.orderStatus.includes("rejected")
  );
  const shipped = orders.filter((item) => item.orderStatus.includes("shipped"));
  const delivered = orders.filter((item) =>
    item.orderStatus.includes("delivered")
  );

  const doughnutState = {
    labels: ["processing", "rejected", "accepted", "shipped", "delivered"],
    datasets: [
      {
        backgroundColor: [
          "#FFFF00",
          "#FF0000",
          "#03a5fc",
          "#00A6B4",
          "#00FF00",
        ],
        data: [
          processing.length,
          rejected.length,
          accepted.length,
          shipped.length,
          delivered.length,
        ],
      },
    ],
  };

  return (
    <div>
      <ProductSummary products={products} />
      <Charts doughnutState={doughnutState} orders={orders} users={users} />
    </div>
  );
};

export default Dashboard;
