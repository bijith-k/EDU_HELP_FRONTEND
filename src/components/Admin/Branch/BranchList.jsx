import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";

import { FaSearch } from "react-icons/fa";

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

const BranchList = () => {
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();
  
  
  const [toastMessage, setToastMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/boards`)
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
          setBoards(res.data.boards);
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

    axiosInstance("Adtoken")
      .get(`admin/branches`)
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
          setBranches(res.data.branches);
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
  }, [toastMessage]);

  

  const handleEdit = (branch) => {
    localStorage.setItem("branchId", branch._id);
    
    navigate("/admin/edit-branch");
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .put(`admin/branch-list-unlist?id=${id}`)
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
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden ">
      <div className="bg-dark-purple ">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage branches
        </p>
        <div className="flex justify-around">
          

          <div className="bg-green-600  p-2 rounded-2xl flex">
            <button
              className="font-bold text-white"
              onClick={() => navigate("/admin/add-branch")}
            >
              ADD BRANCH
            </button>
          </div>
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead className="cursor-pointer">
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th   className="p-3 border">
                  Name of Board/University
                </Th>
                <Th
                  
                  className="p-3 border"
                >
                  Branch
                </Th>
                <Th className="p-3 border text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {boards.map((board, index) => (
                <React.Fragment>
                  <Tr key={board._id} className="bg-white uppercase">
                    <Td className="border">{index + 1}</Td>
                    <Td className="border">{board.name}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                  {branches
                    .filter((branch) => branch.board === board._id)
                    .map((branch) => (
                      <Tr key={branch._id} className="bg-white uppercase">
                        <Td></Td>
                        <Td></Td>
                        <Td className="border">{branch.name}</Td>
                        <Td className="border flex justify-center">
                          <button
                            onClick={() => handleEdit(branch)}
                            className="bg-yellow-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                          >
                            EDIT
                          </button>
                          {branch.listed ? (
                            <button
                              className="bg-gray-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                              onClick={() => handleListUnlist(branch._id)}
                            >
                              UNLIST
                            </button>
                          ) : (
                            <button
                              className="bg-blue-400 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                              onClick={() => handleListUnlist(branch._id)}
                            >
                              LIST
                            </button>
                          )}
                        </Td>
                      </Tr>
                    ))}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BranchList;
