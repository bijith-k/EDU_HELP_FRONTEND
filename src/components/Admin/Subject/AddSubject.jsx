import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddSubject = () => {
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [subjectName, setSubjectName] = useState("");

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

  useEffect(() => {
    if (selectedBoard) {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_PATH
          }admin/branches?board=${selectedBoard}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
            },
          }
        )
        .then((res) => {
          setBranches(res.data.branches);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBranches([]);
    }
  }, [selectedBoard]);

  const token = localStorage.getItem("Adtoken");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BASE_PATH}admin/add-subject`,
        { board: selectedBoard, branch: selectedBranch, subject: subjectName },
        config
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-center",
        });
        setSelectedBoard("");
        setSelectedBranch("");
        setSubjectName("");
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
        });

        console.error(err, "err");
      });
  };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full mt-10">
        <h1 className="text-center text-black  font-extrabold bg-white p-3 ">
          ADD SUBJECT
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto w-3/4 mt-8"
        >
          {/* <label htmlFor="board" className='text-white'>Board</label> */}
          <select
            id="board"
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          >
            <option value="" disabled>
              Select Board
            </option>
            {boards.map((board) => (
              <option key={board._id} value={board._id}>
                {board.name}
              </option>
            ))}
          </select>
          {/* <label htmlFor="branch" className='text-white'>Branch</label> */}
          <select
            id="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          >
            <option value="" disabled>
              Select Branch
            </option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </select>
          {/* <label htmlFor="subjectName" className='text-white'>Enter the name of subject</label> */}
          <input
            type="text"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            id="subjectName"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2"
          >
            ADD SUBJECT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
