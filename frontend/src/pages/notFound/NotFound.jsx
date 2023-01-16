import React from "react";
import { BiError } from "react-icons/bi";
import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <BiError />

      <h3>Page Not Found </h3>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
