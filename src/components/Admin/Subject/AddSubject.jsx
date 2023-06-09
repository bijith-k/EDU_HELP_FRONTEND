import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import axiosInstance from "../../../axios";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const toast = useToast();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const navigate = useNavigate();
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
       })
      .catch((err) => {
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      axiosInstance("Adtoken")
        .get(`admin/branches?board=${selectedBoard}`)
        .then((res) => {

          setBranches(res.data.branches);
        })
        .catch((error) => {
           toast({
             title: error.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
        });
    } else {
      setBranches([]);
    }
  }, [selectedBoard]);

  

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
    if (!selectedBranch) {
      return toast({
        title: "Please select a branch",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    if (!subjectName || !nameRegex.test(subjectName)) {
      return toast({
        title: "Please enter the subject name",
        description: "Don't start name with spaces",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    axiosInstance("Adtoken")
      .post(`admin/add-subject`, {
        board: selectedBoard,
        branch: selectedBranch,
        subject: subjectName,
      })
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
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setSelectedBoard("");
          setSelectedBranch("");
          setSubjectName("");
          navigate("/admin/subject");
        }
        
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "success",
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
