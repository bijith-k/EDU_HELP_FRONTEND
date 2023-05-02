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
import { useDispatch } from "react-redux";
import { setBoardData } from "../../../features/contentSlice";

const BoardList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [toastMessage, setToastMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance("Adtoken")
      .get(`admin/boards`)
      .then((res) => setBoards(res.data.boards))
      .catch((err) => console.error(err));
  }, [toastMessage]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const handleEdit = (board) => {
    localStorage.setItem("boardId", board._id);
    // dispatch(
    //   setBoardData({
    //     board,
    //   })
    // );
    navigate("/admin/edit-board");
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .put(`admin/board-list-unlist?id=${id}`)
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
        setToastMessage(id, err.message);
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
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage boards
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
              onClick={() => navigate("/admin/add-board")}
            >
              ADD BOARD
            </button>
          </div>
        </div>

        {/* <StyledTableContainer component={Paper} className="rounded-2xl mt-3">
          <Table className="min-w-2">
            <TableHead>
              <TableRow className="bg-green-300">
                <StyledTableCell onClick={() => sorting("column1")}>
                  No
                </StyledTableCell>
                <StyledTableCell onClick={() => sorting("column1")}>
                  Name of Board/University
                </StyledTableCell>
                <StyledTableCell onClick={() => sorting("column1")}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boards.map((board, index) => (
                <TableRow key={board._id} className="bg-gray-400 uppercase">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{board.name}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => board._id}
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                    >
                      EDIT
                    </button>
                    <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      UNLIST
                    </button>
                  </TableCell>

                   
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer> */}
        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
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
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                    >
                      EDIT
                    </button>
                    {board.listed ? (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(board._id)}
                      >
                        UNLIST
                      </button>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(board._id)}
                      >
                        LIST
                      </button>
                    )}

                    {/* <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      DELETE
                    </button> */}
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
