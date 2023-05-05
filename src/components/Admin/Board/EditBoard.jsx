import React, { useEffect } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axiosInstance from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setBoardData } from "../../../features/contentSlice";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditBoard = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [boardData, setBoardData] = useState("");

  useEffect(() => {
    const boardId = localStorage.getItem("boardId");
    axiosInstance("Adtoken")
      .get(`admin/boards?id=${boardId}`)
      .then((res) => {
        setBoardData(res.data.boards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameRegex = /^[a-zA-Z]+([ \-'][a-zA-Z]+)*$/;

    if (!boardData.name || !nameRegex.test(boardData.name)) {
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
      .post(`admin/edit-board?id=${boardData._id}`, { ...boardData })
      .then((res) => {
        localStorage.removeItem("boardId");
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/admin/board");
      })
      .catch((error) => {
        console.log(error);
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
      <div className="w-full mt-10">
        <h1 className="text-center text-black font-extrabold bg-white p-3">
          EDIT BOARD/UNIVERSITY
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
            value={boardData.name}
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            placeholder="Enter name of board or University"
            onChange={(e) =>
              setBoardData({ ...boardData, name: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2"
          >
            EDIT BOARD/UNIVERSITY
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
