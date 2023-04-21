import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setVideoData } from "../../../features/contentSlice";

const StyledTableCell = styled(TableCell)({
  borderBottom: "none",
  fontWeight: "bold",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
});
const MangageVideos = () => {
  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();

  const [order, setOrder] = useState("ASC");
  const [toastMessage, setToastMessage] = useState("");

  console.log(videos, "nooo");
  useEffect(() => {
    axios
      .get(`admin/videos`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setVideos(res.data);
      });

    // axios.get(`admin/boards`).then((res)=>{
    //   console.log(res);
    //   setBoards(res.data.boards)
    // })

    // axios.get(`admin/branches`).then((res)=>{
    //   console.log(res,'3');
    //   setBranches(res.data.branches)
    // })
  }, [toastMessage]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("ASC");
    }
  };

  const sortingBranch = (col) => {
    if (order === "ASC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("ASC");
    }
  };

  const handleApprove = (id) => {
    axios
      .get(
        `admin/approve-videos?video=${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(err.data.message);
        toast.error(err.data.message, {
          position: "top-center",
        });
      });
  };

  const handleListUnlist = (id) => {
    axios
      .get(
        `admin/video-list-unlist?video=${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(res.data.message);
        toast.error(res.data.message, {
          position: "top-center",
        });
      });
  };

  // const handleEdit = (video) => {
  //   console.log(video, 32222222);
  //   localStorage.setItem("videoId", video._id);
  //   dispatch(
  //     setVideoData({
  //       videos: video,
  //     })
  //   );
  //   navigate("/admin-edit-videos");
  // };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage videos
        </p>
        <div className="flex justify-around">
          {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
          <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search"
              className="mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto"
            />
            <div className="bg-sky-900 p-3 text-white rounded-full  flex justify-center">
              <FaSearch />
            </div>
          </div>

          {/* <div className='bg-white p-2 rounded-2xl flex'>
        <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD VIDEOS</button>
      </div> */}
        </div>

        <StyledTableContainer
          component={Paper}
          className="rounded-2xl mt-3  border-4 border-white"
        >
          <Table className="min-w-2">
            <TableHead>
              <TableRow className="bg-green-300">
                <StyledTableCell className="">No</StyledTableCell>
                <StyledTableCell onClick={() => sorting("name")}>
                  Name of video
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of subject
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of Branch
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of Board
                </StyledTableCell>
                <StyledTableCell className="text-center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video, index) => (
                <TableRow key={index} className="bg-gray-300 uppercase">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{video.video_name}</TableCell>
                  <TableCell>{video.subject.name}</TableCell>
                  <TableCell>{video.branch.name}</TableCell>
                  <TableCell>{video.board.name}</TableCell>
                  <TableCell className="flex justify-center">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      {" "}
                      <a href={video.video_link} target="_blank">
                        VIEW
                      </a>{" "}
                    </button>
                    {video.approved ? (
                      <>
                        {video.listed ? (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(video._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(video._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleApprove(video._id)}
                      >
                        APPROVE
                      </button>
                    )}
                    {/* <button
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                      onClick={() => handleEdit(video)}
                    >
                      EDIT
                    </button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    </div>
  );
};

export default MangageVideos;
