import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axiosInstance from "../../../axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const EditBranch = () => {
  const [boards, setBoards] = useState([]);
  const [branchData, setBranchData] = useState({});

  const navigate = useNavigate();
  const toast = useToast();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [branch, setBranch] = useState("");
  const token = localStorage.getItem("Adtoken");

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance("Adtoken")
      .get(`admin/boards`)
      .then((res) => setBoards(res.data.boards))
      .catch((err) => console.error(err));
  }, []);

  const branchId = localStorage.getItem("branchId");
  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/branches?id=${branchId}`)
      .then((res) => {
        setBranchData(res.data.branches);
        setSelectedBoard(res.data.branches.board._id);
        setBranch(res.data.branches.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z0-9]+([ \-'][a-zA-Z0-9]+)*$/;

    if (!selectedBoard) {
      return toast({
        title: "Please select a board",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    if (!branch || !nameRegex.test(branch)) {
      return toast({
        title: "Please enter the branch name",
        description: "Don't start name with spaces and enter only letters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    axiosInstance("Adtoken")
      .post(`admin/edit-branch?id=${branchId}`, {
        board: selectedBoard,
        branch: branch,
      })
      .then((res) => {
        localStorage.removeItem("branchId");
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setSelectedBoard("");
        setBranch("");
        navigate("/admin/branch");
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
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
        <h1 className="text-center text-black font-extrabold bg-white p-3 ">
          EDIT BRANCH
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto  w-3/4 mt-8"
        >
          {/* <label htmlFor="board" className='text-white'>Board</label> */}
          <select
            id="board"
            value={selectedBoard}
            onChange={handleBoardChange}
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
          {/* <label htmlFor="branch" className='text-white'>Enter the name of branch</label> */}
          <input
            type="text"
            placeholder="Enter name of branch.."
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            id="branch"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          />
          <button
            type="submit"
            className="bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2"
          >
            EDIT BRANCH
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBranch;
