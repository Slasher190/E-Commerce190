import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../actions/productAction";
ChartJS.register(
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
);
ChartJS.defaults.plugins.legend.position = "bottom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        id: 1,
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A68A", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014f"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹ 2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line datasetIdKey="id" data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
