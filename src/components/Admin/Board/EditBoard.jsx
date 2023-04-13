import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axios from "axios";

const EditBoard = () => {
  const [board, setBoard] = useState({
    board: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_PATH}board`, board);
  };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="md:ml-20 ml-3 mt-10">
        <h1 className="text-center text-black font-extrabold bg-white p-3 rounded-xl">
          ADD BOARD/UNIVERSITY
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto mt-8"
        >
          <label htmlFor="board" className="text-white">
            Enter the name of board or university
          </label>
          <input
            type="text"
            name="board"
            className="p-2 rounded-xl"
            placeholder="Enter here.."
            onChange={(e) => setBoard({ board: e.target.value })}
            id=""
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 font-semibold mt-5 p-2 rounded-2xl"
          >
            ADD BOARD/UNIVERSITY
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
