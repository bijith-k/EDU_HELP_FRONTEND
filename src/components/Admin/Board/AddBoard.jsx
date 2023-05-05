import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axiosInstance from "../../../axios";

import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AddBoard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [board, setBoard] = useState({
    board: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameRegex = /^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/;

    if (!board.board || !nameRegex.test(board.board)) {
      return toast({
        title: "Please enter the board name",
        description: "Don't start name with spaces and enter only letters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    axiosInstance("Adtoken")
      .post(`admin/add-board`, board)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setBoard("");
        navigate("/admin/board");
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        console.log(err, "err");
      });
  };

  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>
      <div className="w-full mt-10">
        <h1 className="text-center text-black font-extrabold bg-white p-3">
          ADD BOARD/UNIVERSITY
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto w-3/4 mt-8"
        >
          {/* <label htmlFor="board" className='text-white'>Enter the name of board or university</label> */}
          <input
            type="text"
            name="board"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            placeholder="Enter name of board or University"
            onChange={(e) => setBoard({ board: e.target.value })}
            id=""
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2"
          >
            ADD BOARD/UNIVERSITY
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBoard;
