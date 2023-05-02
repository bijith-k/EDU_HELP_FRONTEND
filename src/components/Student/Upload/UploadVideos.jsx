import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";

const UploadVideos = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [videoData, setVideoData] = useState({
    videoName: "",
    videoLink: "",
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
  }, [selectedBranch, selectedBoard]);
  // toast.error(errors, {
  //   position: "top-center",
  // },{toastId: 'success1'},);

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

    const videoNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!videoData.videoName || !videoNameRegex.test(videoData.videoName)) {
      setErrors("Enter the name of the video");
      return;
    }

    const token = localStorage.getItem("Stoken");

    await axiosInstance("Stoken")
      .post(
        `upload-videos`,
        {
          ...videoData,
          board: selectedBoard,
          branch: selectedBranch,
          subject: selectedSubject,
          exclusive: false,
        }
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
      <HeadTitle title={"upload video"} />
      {/* <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          upload video
        </h1>
      </div> */}
      <form action="" onSubmit={handleSubmit} className="m-3 w-3/4 mx-auto">
        {errors ? (
          <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">
            {errors}
          </p>
        ) : null}
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
        <label htmlFor="videoName" className=" font-medium">
          Enter the name of video
        </label>
        <input
          type="text"
          name="videoName"
          className="w-full p-3 mb-2"
          placeholder="Enter video name"
          value={videoData.videoName}
          onChange={(e) => {
            setVideoData({ ...videoData, videoName: e.target.value });
            setErrors(null);
          }}
        />{" "}
        <br />
        <label htmlFor="videoLink" className=" font-medium">
          Paste video link(Embed link,
          eg:https://www.youtube.com/embed/g523Bj0y36Q)
        </label>
        <input
          type="text"
          name="videoLink"
          className="w-full p-3 mb-2"
          placeholder="Paste video link"
          value={videoData.videoLink}
          onChange={(e) => {
            setVideoData({ ...videoData, videoLink: e.target.value });
            setErrors(null);
          }}
        />
        <p>
          {" "}
          *These videos will be published only <br /> after admin verification
        </p>
        <button
          type="submit"
          className="bg-blue-900 p-3 font-semibold text-white rounded-lg mt-2"
        >
          UPLOAD VIDEO
        </button>
      </form>
    </div>
  );
};

export default UploadVideos;
