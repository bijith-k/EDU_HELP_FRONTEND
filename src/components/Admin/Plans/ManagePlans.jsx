import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Sidebar from '../Dashboard/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from "../../../axios";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';



const ManagePlans = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const Token = localStorage.getItem("Adtoken")
  const [plans, setPlans] = useState([])
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get(`admin/plans`, {
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
        `admin/plan-list-unlist?plan=${id}`,
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        
        setToastMessage(id, res.data.message);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(id);
        toast({
          title: err.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleEdit = (plan) => {
    
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
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage plans
        </p>
        <div className="flex justify-around">
          {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
          {/* <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
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
        </div> */}

          <div className="bg-white p-2 rounded-2xl flex">
            <button
              className="font-bold text-sky-900"
              onClick={() => navigate("/admin-add-plans")}
            >
              ADD PLAN
            </button>
          </div>
        </div>
        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th className="p-3 border">Plan</Th>
                <Th className="p-3 border">Duration(Month)</Th>
                <Th className="p-3 border">Price</Th>
                <Th className="p-3 border">Total Users</Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {plans.map((plan, index) => (
                <Tr className="bg-white h-16" key={index}>
                  <Td className="border">{index + 1}</Td>
                  <Td className="border uppercase">{plan.plan}</Td>
                  <Td className="border">{plan.duration}</Td>
                  <Td className="border">{plan.price}</Td>
                  <Td className="border">{plan.used_by.length}</Td>
                  <Td className="border flex justify-center">
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
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ManagePlans