"use client";
import Tabs from "@/COMMON/Tabs";
import Dashboard1 from "@/USER/dashboard/DashBoard";
import Shops from "@/USER/Shops/Shops";
import { Grid } from "@mui/material";
import React from "react";
import Dashboard2 from "./Dashboard2";
import Products from "./Products";

const AdminDashboard = () => {
  const tabsData = [
    { label: "DashBoard", value: "1", content: <Dashboard2></Dashboard2> },
    { label: "Products", value: "2", content: <Products></Products> },
    { label: "Orders", value: "3", content: <Shops></Shops> },
  ];
  return (
    <>
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Tabs tabs={tabsData} />
      </Grid>
    </>
  );
};

export default AdminDashboard;
