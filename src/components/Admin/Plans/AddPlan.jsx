import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddPlan = () => {
   
  const [values, setValues] = useState({
    plan:'',
    duration:'',
    price:''
  });

   

  const token = localStorage.getItem("Adtoken");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BASE_PATH}admin/add-plan`,
        { ...values },
        config
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-center",
        });
        
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
        });

        console.error(err, "err");
      });
  };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full mt-10">
        <h1 className="text-center text-black  font-extrabold bg-white p-3 ">
          ADD PLAN
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto w-3/4 mt-8"
        >
          
          <input
            type="text"
            placeholder="Enter plan name"
             
            onChange={(e) => setValues({...values,plan:e.target.value})}
            id="name"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <input
            type="text"
            placeholder="Enter plan duration"
             
            onChange={(e) => setValues({...values,duration:e.target.value})}
            id="duration"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <input
            type="text"
            placeholder="Enter price"
             
            onChange={(e) => setValues({...values,price:e.target.value})}
            id="price"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2"
          >
            ADD PLAN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlan
