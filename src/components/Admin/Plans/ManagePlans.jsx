import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

const ManagePlans = () => {
  const navigate = useNavigate();
  const toast = useToast();
   
  const [plans, setPlans] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/plans`)
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
          setPlans(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
    localStorage.removeItem("planId");
  }, [toastMessage]);

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/plan-list-unlist?plan=${id}`)
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
          setToastMessage(`Clicked at ${new Date().toISOString()}`);
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
        
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
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
    navigate("/admin/edit-plans");
  };
  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage plans
        </p>
        <div className="flex justify-around">
          

          <div className="bg-green-600 text-white p-2 rounded-2xl flex">
            <button
              className="font-bold "
              onClick={() => navigate("/admin/add-plans")}
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
                <Th className="p-3 border text-center">Actions</Th>
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
                    <button
                      className="bg-yellow-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                      onClick={() => handleEdit(plan)}
                    >
                      EDIT
                    </button>
                    {plan.listed ? (
                      <button
                        className="bg-gray-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(plan._id)}
                      >
                        UNLIST
                      </button>
                    ) : (
                      <button
                        className="bg-blue-400 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(plan._id)}
                      >
                        LIST
                      </button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ManagePlans;
