import React from "react";
import Sidebar from "./Sidebar";

 
const Dashboard = () => {
  return (
    <div className="bg-sky-100 h-screen w-full flex overflow-x-hidden relative">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <p className="text-xl text-center">DASHBOARD</p>
      </div>
    </div>
  );
};

export default Dashboard;
