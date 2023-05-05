import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axiosInstance from "../../../axios";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddPlan = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    plan: "",
    duration: "",
    price: "",
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

    const planNameRegex = /^[a-zA-Z0-9_-\s]+$/;

    if (!values.plan || !planNameRegex.test(values.plan)) {
      return toast({
        title: "Enter the name of the plan",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    const durationRegex = /^1[0-2]$|^[1-9]$/;
    if (!values.duration || !durationRegex.test(values.duration)) {
      return toast({
        title: "Enter the duration in number of months",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    const priceRegex = /^[1-9]\d*(\.\d{1,2})?$/;
    if (!values.price || !priceRegex.test(values.price)) {
      return toast({
        title: "Enter price for the plan",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    axiosInstance("Adtoken")
      .post(`admin/add-plan`, { ...values })
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/admin/plans");
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        console.error(err, "err");
      });
  };
  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
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
            onChange={(e) => setValues({ ...values, plan: e.target.value })}
            id="name"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <input
            type="text"
            placeholder="Enter plan duration"
            onChange={(e) => setValues({ ...values, duration: e.target.value })}
            id="duration"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <input
            type="text"
            placeholder="Enter price"
            onChange={(e) => setValues({ ...values, price: e.target.value })}
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

export default AddPlan;
