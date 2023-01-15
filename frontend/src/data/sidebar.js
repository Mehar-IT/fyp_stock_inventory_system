import {
  FaTh,
  FaRegChartBar,
  FaCommentAlt,
  FaUsers,
  FaOpencart,
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },

  {
    title: "Orders",
    icon: <FaOpencart />,
    childrens: [
      {
        title: "Orders",
        path: "/orders",
      },
      {
        title: "Submit Order",
        path: "/add-order",
      },
    ],
  },
  {
    title: "Stocks",
    icon: <AiOutlineStock />,
    childrens: [
      {
        title: "Avalaible Stock",
        path: "/stocks",
      },
      {
        title: "Add Stock",
        path: "/add-product",
      },
    ],
  },

  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Users List",
    icon: <FaUsers />,
    path: "/user-list",
  },
  {
    title: "Feedback",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
