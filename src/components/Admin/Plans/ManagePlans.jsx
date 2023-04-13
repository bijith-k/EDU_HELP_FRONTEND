import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Sidebar from '../Dashboard/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManagePlans = () => {
  const navigate = useNavigate()
  const Token = localStorage.getItem("Adtoken")
  const [plans, setPlans] = useState([])
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/plans`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPlans(res.data);
      });
      localStorage.removeItem("planId");
  }, [toastMessage]);

  const handleListUnlist = (id) => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_PATH}admin/plan-list-unlist?plan=${id}`,
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(id);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(id);
        toast.error(res.data.message, {
          position: "top-center",
        });
      });
  };

  const handleEdit = (plan) => {
    console.log(plan, "nouuutesjrlj");
    localStorage.setItem("planId", plan._id);
    // dispatch(
    //   setNoteData({
    //     note: note,
    //   })
    // );
    navigate("/admin-edit-plans");
  };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
    <div>
      <Sidebar />
    </div>
    <div className="w-full p-5 overflow-clip">
      <div className="flex justify-around">
        {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
        <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto"
          />
          <div className="bg-sky-900 p-3 text-white rounded-full  flex justify-center">
            <FaSearch />
          </div>
        </div>

        <div className="bg-white p-2 rounded-2xl flex">
          <button
            className="font-bold text-sky-900"
            onClick={() => navigate("/admin-add-plans")}
          >
            ADD PLAN
          </button>
        </div>
      </div>
<div className='p-1 mt-2 bg-white w-full h-fit rounded-lg overflow-x-auto'>
<table className='table-auto h-fit w-full border-2  border-white'>
        <thead>
          <tr className='bg-green-300 h-14 uppercase'>
             <th className='p-3 border'>No</th>
             <th className='p-3 border'>Plan</th>
             <th className='p-3 border'>Duration(Month)</th>
             <th className='p-3 border'>Price</th>
             <th className='p-3 border'>Total Users</th>
             <th className='p-3 border'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {plans.map((plan,index)=> (
              <tr className='bg-gray-300 h-16' key={index}>
              <td className='border'>{index+1}</td>
              <td className='border uppercase'>{plan.plan}</td>
              <td className='border'>{plan.duration}</td>
              <td className='border'>{plan.price}</td>
              <td className='border'>100</td>
              <td className='border flex justify-center'>
               
                        {plan.listed ? (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(plan._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(plan._id)}
                          >
                            LIST
                          </button>
                        )}
                      
                    

                    <button
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                      onClick={() => handleEdit(plan)}
                    >
                      EDIT
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
</div>
      
    </div>
  </div>
  )
}

export default ManagePlans