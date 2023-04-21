import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { setQuestionData } from "../../../features/contentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditQuestionPapers = () => {
  const questions = useSelector((state) => state.contents.questionPapers);
  console.log(questions, "ques");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("Adtoken");

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [errors, setErrors] = useState(null);
  const [questionDatas, setQuestionDatas] = useState({
    examName: "",
    question: null,
  });

  useEffect(() => {
    const questionId = localStorage.getItem("questionId");
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_PATH
        }admin/question-papers?id=${questionId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "res");

        dispatch(
          setQuestionData({
            questionPapers: res.data,
          })
        );
        setSelectedBoard(res.data.board._id);
        setSelectedBranch(res.data.branch._id);
        setSelectedSubject(res.data.subject._id);
        setQuestionDatas({ ...questionDatas, examName: res.data.exam_name });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`admin/boards`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBoards(res.data.boards);
      })
      .catch((error) => {
        console.log(error);
      });
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
              authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (selectedBranch) {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_PATH
          }admin/subjects?branch=${selectedBranch}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSubjects(res.data.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSubjects([]);
    }
  }, [selectedBranch, selectedBoard]);

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
    if (
      !questionDatas.examName ||
      !fileNameRegex.test(questionDatas.examName)
    ) {
      setErrors("Enter the name of the exam");
      return;
    }
    if (
      questionDatas.question &&
      questionDatas.question.type !== "application/pdf"
    ) {
      setErrors(
        "Select a question paper to upload or You have selected a file otherthan pdf"
      );
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(
        `admin/edit-question-papers?question=${
          questions._id
        }`,
        {
          ...questionDatas,
          board: selectedBoard,
          branch: selectedBranch,
          subject: selectedSubject,
        },
        config
      )
      .then((res) => {
        if (res.data.updated) {
          navigate("/admin-question-papers");
        } else {
          toast.error(res.data.message, {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server error");
      });
  };

  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          edit question paper
        </p>
        <div>
          <form action="" onSubmit={handleSubmit} className="m-3 w-3/4 mx-auto">
            {errors ? (
              <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">
                {errors}
              </p>
            ) : null}
            <label htmlFor="board" className="text-white font-medium">
              Select to edit the name of board
            </label>
            <select
              name="board"
              value={selectedBoard}
              onChange={(e) => {
                setSelectedBoard(e.target.value);
                setErrors(null);
              }}
              className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            >
              {/* <option
          value=""
          className="block border border-grey-light w-full p-3 rounded mb-4"
          disabled
        >
          Select Board/University
        </option> */}
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
            <label htmlFor="branch" className="text-white font-medium">
              Select to edit the name of branch/class
            </label>
            <select
              name="branch"
              className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setErrors(null);
              }}
            >
              {/* <option
         value=''
          className="block border border-grey-light w-full p-3 rounded mb-4 "
          disabled
        >
          Select Class/Branch
        </option> */}

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
            <label htmlFor="subject" className="text-white font-medium">
              Select to edit the name of subject
            </label>
            <select
              name=" subject"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setErrors(null);
              }}
              className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            >
              {/* <option
          value=""
          className="block border border-grey-light w-full p-3 rounded mb-4"
          disabled
        >
          Select Subject
        </option> */}

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
            <label htmlFor="examName" className=" font-medium text-white">
              Edit the name of exam
            </label>
            <input
              type="text"
              name="examName"
              className="w-full p-3 mb-2"
              placeholder="Enter name of exam"
              value={questionDatas.examName}
              onChange={(e) => {
                setQuestionDatas({
                  ...questionDatas,
                  examName: e.target.value,
                });
                setErrors(null);
              }}
            />{" "}
            <br />
            <label htmlFor="notes" className=" font-medium text-white">
              Selected file
            </label>
            <div className="mb-2">
              <iframe
                src={`${questions.file_path}`}
                width="50%"
                height="50%"
                frameBorder="0"
              ></iframe>
            </div>
            <label htmlFor="questions" className=" font-medium text-white">
              Change file
            </label>
            <input
              type="file"
              name="questions"
              className="w-full bg-white p-2"
              onChange={(e) => {
                setQuestionDatas({
                  ...questionDatas,
                  question: e.target.files[0],
                });
                setErrors(null);
              }}
            />
            <button
              type="submit"
              className="bg-dark-purple p-3 font-semibold text-white rounded-lg mt-2"
            >
              EDIT QUESTION PAPER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPapers;
