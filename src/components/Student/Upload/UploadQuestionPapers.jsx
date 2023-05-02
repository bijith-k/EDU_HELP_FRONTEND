import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";

const UploadQuestionPapers = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [questionData, setQuestionData] = useState({
    examName: "",
    questions: null,
  });
  const toast = useToast();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance("Stoken")
      .get(`boards`)
      .then((res) => setBoards(res.data.boards))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      axiosInstance("Stoken")
        .get(`branches?board=${selectedBoard}`)
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

  useEffect(() => {
    if (selectedBranch) {
      axiosInstance("Stoken")
        .get(`subjects?branch=${selectedBranch}`)
        .then((res) => {
          setSubjects(res.data.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSubjects([]);
    }
    // toast({
    //   title: err.message,
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    //   position: "top",
    // });
  }, [selectedBranch, selectedBoard, errors]);

  // useEffect(() => {

  // }, [errors])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBoard) {
      setErrors("Select a board");
      return;
    }
    if (!selectedBranch) {
      setErrors("Select a branch");
      return;
    }
    if (!selectedSubject) {
      setErrors("Select a subject");
      return;
    }

    const fileNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!questionData.examName || !fileNameRegex.test(questionData.examName)) {
      setErrors("Enter the name of the exam");
      return;
    }
    if (
      !questionData.questions ||
      questionData.questions.type !== "application/pdf"
    ) {
      setErrors(
        "Select a question paper to upload or You have selected a file otherthan pdf"
      );
      return;
    }

    const token = localStorage.getItem("Stoken");

    await axiosInstance("Stoken")
      .post(
        `upload-question-papers`,
        {
          ...questionData,
          board: selectedBoard,
          branch: selectedBranch,
          subject: selectedSubject,
          exclusive: false,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        if (res.data.uploaded) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/notes");
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
    <div className="bg-gray-300 h-full pt-16 w-full overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"upload question papers"} />
      {/* <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          upload question papers
        </h1>
      </div> */}
      <form action="" onSubmit={handleSubmit} className="m-3 w-3/4 mx-auto">
        {/* {errors ? <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">{errors}</p> : null } */}
        <select
          name="board"
          value={selectedBoard}
          onChange={(e) => {
            setSelectedBoard(e.target.value);
            setErrors(null);
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
            setErrors(null);
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
            setErrors(null);
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
        <label htmlFor="examName" className=" font-medium">
          Enter the name of exam
        </label>
        <input
          type="text"
          name="examName"
          className="w-full p-3 mb-2"
          placeholder="Enter exam name"
          value={questionData.examName}
          onChange={(e) => {
            setQuestionData({ ...questionData, examName: e.target.value });
            setErrors(null);
          }}
        />{" "}
        <br />
        <label htmlFor="questions" className=" font-medium">
          Select the file
        </label>
        <input
          type="file"
          name="questions"
          className="w-full bg-white p-2"
          onChange={(e) => {
            setQuestionData({ ...questionData, questions: e.target.files[0] });
            setErrors(null);
          }}
        />
        <p>
          {" "}
          *These question paper will be published only <br /> after admin
          verification
        </p>
        <button
          type="submit"
          className="bg-blue-900 p-3 font-semibold text-white rounded-lg mt-2"
        >
          UPLOAD QUESTION PAPER
        </button>
      </form>
    </div>
  );
};

export default UploadQuestionPapers;
