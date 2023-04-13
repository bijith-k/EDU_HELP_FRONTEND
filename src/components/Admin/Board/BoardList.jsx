import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledTableCell = styled(TableCell)({
  borderBottom: "none",
  fontWeight: "bold",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
});

const BoardList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    // Fetch boards from server on component mount
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/boards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => setBoards(res.data.boards))
      .catch((err) => console.error(err));
  }, []);

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
              onClick={() => navigate("/admin-add-board")}
            >
              ADD BOARD
            </button>
          </div>
        </div>

        <StyledTableContainer component={Paper} className="rounded-2xl mt-3">
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

                  {/* <TableCell><img src={ragam} className='w-24' alt="" /></TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    </div>
  );
};

export default BoardList;
