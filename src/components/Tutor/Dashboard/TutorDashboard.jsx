import React, { useState } from "react";

import SideBar from "./SideBarData";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const TutorDashboard = () => {
  const tutor = useSelector((state) => state.tutor);

  return (
    <div className="bg-slate-400 min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <div className=" w-full">
        <div className="bg-gray-500 h-48 flex flex-col justify-center items-center text-center md:justify-center uppercase ">
          <span className="text-2xl font-bold text-white">
            It's the teacher that makes the difference, not the classroom
          </span>
          <span className="text-xl font-semibold border-b-2 mt-3">
            <span className="text-slate-100">happy</span> teaching{" "}
            <span className="text-slate-100">{tutor.name}</span>
          </span>
        </div>
        <div className=" flex flex-col md:flex-row justify-center md:justify-around items-center pt-5 uppercase">
          <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
            <div className="text-xl font-bold">your notes</div>
            <div className="font-semibold">uploaded : 10</div>
            <div className="font-semibold">pending approval : 10</div>
          </div>
          <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
            <div className="text-xl font-bold">your question papers</div>
            <div className="font-semibold">uploaded : 10</div>
            <div className="font-semibold">pending approval : 10</div>
          </div>
          <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
            <div className="text-xl font-bold">your videos</div>
            <div className="font-semibold">uploaded : 10</div>
            <div className="font-semibold">pending approval : 10</div>
          </div>
          <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
            <div className="text-xl font-bold">your events</div>
            <div className="font-semibold">uploaded : 10</div>
            <div className="font-semibold">pending approval : 10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
