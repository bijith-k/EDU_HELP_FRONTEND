import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../Dashboard/Navbar";
import { Button, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

const TutorUploadNotes = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  

  const [notesData, setNotesData] = useState({
    note: null,
    noteName: "",
  });

  const { tutor } = useSelector((state) => state.tutor);

  useEffect(() => {
    if (tutor.approved == false && tutor.rejected == false) {
      navigate("/tutor/approval-pending");
    } else if (tutor.rejected) {
      navigate("/tutor/approval-rejected");
    } else if (tutor.blocked) {
      localStorage.removeItem("Ttoken");
      navigate("/tutor");
      toast({
        title: "Blocked",
        description: "Your account is blocked by the admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance("Ttoken")
      .get(`tutor/boards`)
      .then((res) => {
        if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Ttoken");
          navigate("/tutor");
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
       })
      });
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      setSelectedBranch("");
      setSelectedSubject("");
      axiosInstance("Ttoken")
        .get(`tutor/branches?board=${selectedBoard}`)
        .then((res) => {
          if (res.data.status == false) {
             
            localStorage.removeItem("Ttoken");
            navigate("/tutor");
          } else {
            setBranches(res.data.branches);
          }
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
    } else {
      setBranches([]);
    }
  }, [selectedBoard]);

  useEffect(() => {
    if (selectedBranch) {
      setSelectedSubject("");
      axiosInstance("Ttoken")
        .get(`tutor/subjects?branch=${selectedBranch}`)
        .then((res) => {
           if (res.data.status == false) {
             localStorage.removeItem("Ttoken");
             navigate("/tutor");
           } else {
            setSubjects(res.data.subjects);
           }
          
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
    } else {
      setSubjects([]);
    }
  }, [selectedBranch, selectedBoard]);

  const errorToast = (message) => {
    toast({
      title: message,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBoard) {
      errorToast("Select a board");
      return;
    }
    if (!selectedBranch) {
      errorToast("Select a branch");
      return;
    }
    if (!selectedSubject) {
      errorToast("Select a subject");
      return;
    }

    const noteNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!notesData.noteName || !noteNameRegex.test(notesData.noteName)) {
      errorToast("Enter the name of the note");
      return;
    }
    if (!notesData.note || notesData.note.type !== "application/pdf") {
      errorToast(
        "Select a note to upload or You have selected a file otherthan pdf"
      );
      return;
    }

     
 setIsLoading(true);
    await axiosInstance("Ttoken")
      .post(
        `tutor/upload-notes`,
        {
          ...notesData,
          board: selectedBoard,
          branch: selectedBranch,
          subject: selectedSubject,
          exclusive: true,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
         setIsLoading(false);
        if (res.data.uploaded) {
          navigate("/tutor/uploads");
        } else {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((error) => {
         setIsLoading(false);
        console.log(error);
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
    <div className="bg-gray-400 min-h-screen max-w-screen-2xl mx-auto w-full">
      <Navbar />
      <div className="">
        <div className="bg-gray-600">
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            upload notes
          </h1>
        </div>
        <form action="" onSubmit={handleSubmit} className="m-3 w-3/4 mx-auto">
           
          <select
            name="board"
            value={selectedBoard}
            onChange={(e) => {
              setSelectedBoard(e.target.value);
               
            }}
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          >
            <option
              value=""
              className="block border border-grey-light w-full p-3 rounded mb-4"
              disabled
            >
              Select Board/University
            </option>
            {boards.map((board) => (
              <option
                value={board._id}
                key={board._id}
                className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
              >
                {board.name}
              </option>
            ))}
          </select>
          <select
            name="branch"
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              
            }}
          >
            <option
              value=""
              className="block border border-grey-light w-full p-3 rounded mb-4 "
              disabled
            >
              Select Class/Branch
            </option>

            {branches.map((branch) => (
              <option
                value={branch._id}
                key={branch._id}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              >
                {branch.name}
              </option>
            ))}
          </select>
          <select
            name=" subject"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              
            }}
            className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
          >
            <option
              value=""
              className="block border border-grey-light w-full p-3 rounded mb-4"
              disabled
            >
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              >
                {subject.name}
              </option>
            ))}
          </select>
          <label htmlFor="noteName" className=" font-medium">
            Enter the name of note
          </label>
          <input
            type="text"
            name="noteName"
            className="w-full p-3 mb-2"
            placeholder="Enter name of note"
            value={notesData.noteName}
            onChange={(e) => {
              setNotesData({ ...notesData, noteName: e.target.value });
               
            }}
          />{" "}
          <br />
          <label htmlFor="notes" className=" font-medium">
            Select the file
          </label>
          <input
            type="file"
            name="note"
            className="w-full bg-white p-2"
            onChange={(e) => {
              setNotesData({ ...notesData, note: e.target.files[0] });
              
            }}
          />
          <p>
            {" "}
            *These notes will be published only <br /> after admin verification
          </p>
          <Button
          isLoading={isLoading}
            type="submit"
            className="bg-gray-600 p-3 font-semibold text-white rounded-lg mt-2"
          >
            UPLOAD NOTE
          </Button>
        </form>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default TutorUploadNotes;
