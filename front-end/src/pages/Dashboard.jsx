import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <main className="flex-1 ">
      <Navbar />
      <Outlet />
    </main>
  </div>
);

export default Dashboard;
