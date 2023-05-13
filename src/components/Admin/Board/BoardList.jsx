import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";

import { FaSearch } from "react-icons/fa";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
 
const BoardList = () => {
  const navigate = useNavigate();
  
  const [boards, setBoards] = useState([]);
 
  const [toastMessage, setToastMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch boards from server on component mount
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
        }
        
        )
      .catch((err) =>{ console.error(err)
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });});
  }, [toastMessage]);

 

  const handleEdit = (board) => {
    localStorage.setItem("boardId", board._id);
     
    navigate("/admin/edit-board");
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .put(`admin/board-list-unlist?id=${id}`)
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
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage boards
        </p>
        <div className="flex justify-around">
          

          <div className="bg-green-600 text-white p-2 rounded-2xl flex">
            <button
              className="font-bold "
              onClick={() => navigate("/admin/add-board")}
            >
              ADD BOARD
            </button>
          </div>
        </div>

        
        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
             
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th isNumeric className="p-3 border">
                  No
                </Th>
                <Th className="p-3 border">Name of Board/University</Th>
                <Th className="p-3 border text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {boards.map((board, index) => (
                <Tr key={board._id} className="bg-white uppercase">
                  <Td isNumeric className="border">
                    {index + 1}
                  </Td>
                  <Td className="border">{board.name}</Td>
                  <Td className="border flex justify-center">
                    <button
                      onClick={() => handleEdit(board)}
                      className="bg-yellow-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                    >
                      EDIT
                    </button>
                    {board.listed ? (
                      <button
                        className="bg-gray-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(board._id)}
                      >
                        UNLIST
                      </button>
                    ) : (
                      <button
                        className="bg-blue-400 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(board._id)}
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

export default BoardList;
