import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setVideoData } from "../../../features/contentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditVideos = () => {
  const videos = useSelector((state) => state.contents.videos);
  console.log(videos, "ques");
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
  const [videoDatas, setVideoDatas] = useState({
    videoName: "",
    videoLink: "",
  });

  console.log(videoDatas, "kkkkkkkkkk");

  useEffect(() => {
    const videoId = localStorage.getItem("videoId");
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/videos?id=${videoId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "res");

        dispatch(
          setVideoData({
            videos: res.data,
          })
        );
        setSelectedBoard(res.data.board._id);
        setSelectedBranch(res.data.branch._id);
        setSelectedSubject(res.data.subject._id);
        setVideoDatas({
          videoName: res.data.video_name,
          videoLink: res.data.video_link,
        });
      })
      .catch((error) => {
        console.log(error, "err");
      });

    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/boards`, {
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

    const videoNameRegex = /^[a-zA-Z0-9_-\s]+$/;
    if (!videoDatas.videoName || !videoNameRegex.test(videoDatas.videoName)) {
      setErrors("Enter the name of the video");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(
        `${import.meta.env.VITE_BASE_PATH}admin/edit-videos?video=${
          videos._id
        }`,
        {
          ...videoDatas,
          board: selectedBoard,
          branch: selectedBranch,
          subject: selectedSubject,
        },
        config
      )
      .then((res) => {
        if (res.data.updated) {
          localStorage.removeItem("videoId");
          navigate("/admin-videos");
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
            <label htmlFor="videoName" className=" font-medium text-white">
              Edit the name of video
            </label>
            <input
              type="text"
              name="videoName"
              className="w-full p-3 mb-2"
              placeholder="Enter video name"
              value={videoDatas.videoName}
              onChange={(e) => {
                setVideoDatas({ ...videoDatas, videoName: e.target.value });
                setErrors(null);
              }}
            />{" "}
            <br />
            <label htmlFor="video" className=" font-medium text-white">
              Selected video
            </label>
            <div className="mb-2">
              <iframe
                src={`${videos.video_link}`}
                width="50%"
                height="50%"
                frameBorder="0"
              ></iframe>
            </div>
            <label htmlFor="videoLink" className=" font-medium text-white">
              Enter new video link
            </label>
            <input
              type="text"
              name="videoLink"
              className="w-full bg-white p-2"
              value={videoDatas.videoLink}
              onChange={(e) => {
                setVideoDatas({ ...videoDatas, videoLink: e.target.value });
                setErrors(null);
              }}
            />
            <button
              type="submit"
              className="bg-dark-purple p-3 font-semibold text-white rounded-lg mt-2"
            >
              EDIT VIDEO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVideos;
