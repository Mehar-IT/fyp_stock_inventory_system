import {
  FaTh,
  FaRegChartBar,
  FaCommentAlt,
  FaUsers,
  FaOpencart,
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

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
    title: "Filter Order",
    icon: <FiFilter />,
    path: "/filterdOrder",
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

export const departments = [
  {
    id: 1,
    name: "Advanced Research Studies in Chemical Sciences",
  },
  {
    id: 2,
    name: "Anthropology & Archaeology",
  },
  {
    id: 3,
    name: "Arabic & Persian",
  },
  {
    id: 4,
    name: "Arts & Design",
  },
  {
    id: 5,
    name: "Biochemistry",
  },
  {
    id: 6,
    name: "Biotechnology & Genetic Engineering",
  },
  {
    id: 7,
    name: "Business Administration",
  },
  {
    id: 8,
    name: "Chemistry",
  },
  {
    id: 9,
    name: "Commerce",
  },
  {
    id: 10,
    name: "Comparative Religion & Islamic Culture",
  },
  {
    id: 11,
    name: "Criminology",
  },
  {
    id: 12,
    name: "Curriculum Development & Special Edu",
  },
  {
    id: 13,
    name: "Distance, Continuing and Computer Edu",
  },
  {
    id: 14,
    name: "Economics",
  },
  {
    id: 15,
    name: "Education",
  },
  {
    id: 16,
    name: "Educational Management and Supervision",
  },
  {
    id: 17,
    name: "Electronic Engineering",
  },
  {
    id: 18,
    name: "English Language",
  },
  {
    id: 19,
    name: "Environmental Science",
  },
  {
    id: 20,
    name: "Freshwater Biology & Fisheries",
  },
  {
    id: 21,
    name: "General History",
  },
  {
    id: 22,
    name: "Geography",
  },
  {
    id: 23,
    name: "Health and Physical Education Sports Science",
  },
  {
    id: 24,
    name: "Information Technology",
  },
  {
    id: 25,
    name: "International Relations",
  },
  {
    id: 26,
    name: "Law",
  },
  {
    id: 27,
    name: "Library Information Science & Archive Studies",
  },
  {
    id: 28,
    name: "Mass Communication",
  },
  {
    id: 29,
    name: "Mathematics & Computer Science",
  },
  {
    id: 30,
    name: "Microbiology",
  },
  {
    id: 31,
    name: "Muslim History",
  },
  {
    id: 32,
    name: "National Center of Excellence in Analytical Chemistry",
  },
  {
    id: 33,
    name: "Pakistan Studies Centre",
  },
  {
    id: 34,
    name: "Pharmaceutical Chemistry",
  },
  {
    id: 35,
    name: "Pharmaceutics",
  },
  {
    id: 36,
    name: "Pharmacognosy",
  },
  {
    id: 37,
    name: "Pharmacology",
  },
  {
    id: 38,
    name: "Physics",
  },
  {
    id: 39,
    name: "Physiology",
  },
  {
    id: 40,
    name: "Plant Sciences",
  },
  {
    id: 41,
    name: "Political Science",
  },
  {
    id: 42,
    name: "Psychological Testing, Guidance & Research",
  },
  {
    id: 43,
    name: "Psychology",
  },
  {
    id: 44,
    name: "Public Administration",
  },
  {
    id: 45,
    name: "Pure & Applied Geology",
  },
  {
    id: 46,
    name: "Science and Technical Education",
  },
  {
    id: 47,
    name: "Sindh Development Studies Centre",
  },
  {
    id: 48,
    name: "Sindhi",
  },
  {
    id: 49,
    name: "Social Work",
  },
  {
    id: 50,
    name: "Sociology",
  },
  {
    id: 51,
    name: "Software Engineering",
  },
  {
    id: 52,
    name: "Statistics",
  },
  {
    id: 53,
    name: "Telecommunication Engineering",
  },
  {
    id: 54,
    name: "Telemedicine and e-Health",
  },
  {
    id: 55,
    name: "Urdu",
  },
  {
    id: 56,
    name: "Women Development Studies",
  },
  {
    id: 57,
    name: "Zoology",
  },
];
export default menu;
