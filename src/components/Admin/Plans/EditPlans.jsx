 
import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setNoteData } from "../../../features/contentSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditPlans = () => {
 

  const token = localStorage.getItem("Adtoken");
  const planId = localStorage.getItem("planId");


  const navigate = useNavigate();
   
 

  const [errors, setErrors] = useState(null);

  const [updateData, setUpdateData] = useState({
    plan: '',
    duration: "",
    price:''
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/plans?id=${planId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "res");
        setUpdateData({ plan: res.data.plan,
        duration:res.data.duration,
        price:res.data.price });
      })
      .catch((error) => {
        console.log(error);
      });

     
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

     

    const planNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!updateData.plan || !planNameRegex.test(updateData.plan)) {
      setErrors("Enter the name of the plan");
      return;
    }
    const durationRegex = /^[0-9]+$/;
    if (!updateData.duration || !durationRegex.test(updateData.duration)) {
      setErrors("Enter the duration in number of months");
      return;
    }

    const priceRegex = /^[0-9]+$/;
    if (!updateData.price || !priceRegex.test(updateData.price)) {
      setErrors("Enter price for the plan");
      return;
    }
 

    const config = {
      headers: {
        // "Content-Type": "",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(
        `${import.meta.env.VITE_BASE_PATH}admin/edit-plans?plan=${planId}`,
        {
          ...updateData,
         
        },
        config
      )
      .then((res) => {
        if (res.data.updated) {
          localStorage.removeItem("planId");
          navigate("/admin-plans");
        } else {
          toast.error(res.data.message, {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server error");
      });
  };

  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          edit note
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

export default EditPlans