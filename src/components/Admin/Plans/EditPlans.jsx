import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { useToast } from "@chakra-ui/react";

const EditPlans = () => {
  const toast = useToast();
  const token = localStorage.getItem("Adtoken");
  const planId = localStorage.getItem("planId");

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);

  const [updateData, setUpdateData] = useState({
    plan: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/plans?id=${planId}`)
      .then((res) => {
        if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
           setUpdateData({
             plan: res.data.plan,
             duration: res.data.duration,
             price: res.data.price,
           });
        }
       
      })
      .catch((error) => {
         
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const planNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!updateData.plan || !planNameRegex.test(updateData.plan)) {
      return toast({
        title: "Enter the name of the plan",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    const durationRegex = /^1[0-2]$|^[1-9]$/;
    if (!updateData.duration || !durationRegex.test(updateData.duration)) {
      return toast({
        title: "Enter the duration in number of months",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    const priceRegex = /^[1-9]\d*(\.\d{1,2})?$/;
    if (!updateData.price || !priceRegex.test(updateData.price)) {
      return toast({
        title: "Enter price for the plan",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

     

    await axiosInstance("Adtoken")
      .post(`admin/edit-plans?plan=${planId}`, {
        ...updateData,
      })
      .then((res) => {
        if (res.data.updated) {
          localStorage.removeItem("planId");
          navigate("/admin/plans");
        } else {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((error) => {
        
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          edit plan
        </p>
        <div>
          <form action="" onSubmit={handleSubmit} className="m-3 w-3/4 mx-auto">
            {errors ? (
              <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">
                {errors}
              </p>
            ) : null}

            <label htmlFor="plan" className=" font-medium text-white">
              Edit the name of plan
            </label>
            <input
              type="text"
              name="plan"
              className="w-full p-3 mb-2"
              placeholder="Enter name of plan"
              value={updateData.plan}
              onChange={(e) => {
                setUpdateData({ ...updateData, plan: e.target.value });
                setErrors(null);
              }}
            />

            <label htmlFor="duration" className=" font-medium text-white">
              Edit the duration of the plan
            </label>
            <input
              type="text"
              name="duration"
              className="w-full p-3 mb-2"
              placeholder="Enter duration of plan"
              value={updateData.duration}
              onChange={(e) => {
                setUpdateData({ ...updateData, duration: e.target.value });
                setErrors(null);
              }}
            />

            <label htmlFor="price" className=" font-medium text-white">
              Edit the price of plan
            </label>
            <input
              type="text"
              name="price"
              className="w-full p-3 mb-2"
              placeholder="Enter price of plan"
              value={updateData.price}
              onChange={(e) => {
                setUpdateData({ ...updateData, price: e.target.value });
                setErrors(null);
              }}
            />

            <button
              type="submit"
              className="bg-dark-purple p-3 font-semibold text-white rounded-lg mt-2"
            >
              EDIT PLAN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlans;
