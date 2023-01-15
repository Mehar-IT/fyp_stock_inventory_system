import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./chart.css";
import { Link } from "react-router-dom";

export default function Charts({ doughnutState, orders, users }) {
  return (
    <div className="dashboardSummary">
      <div className="dashboardSummaryBox2">
        <Link to="/orders">
          <p>Orders</p>
          <p>{orders && orders.length}</p>
        </Link>
        <Link to="/user-list">
          <p>Users</p>
          <p>{users && users.length}</p>
        </Link>
      </div>{" "}
      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  );
}
