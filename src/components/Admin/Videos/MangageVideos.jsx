import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { useDispatch } from "react-redux";
import { setVideoData } from "../../../features/contentSlice";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const MangageVideos = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [videoId, setVideoId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (id) => {
    onOpen();
    setVideoId(id);
  };
  const [rejectionReason, setRejectionReason] = useState("");

  const [videos, setVideos] = useState([]);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();

  const [order, setOrder] = useState("ASC");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/videos`)
      .then((res) => {
        setVideos(res.data);
      });
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
    axiosInstance("Adtoken")
      .get(`admin/approve-videos?video=${id}`)
      .then((res) => {
        setToastMessage(res.data.message);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(err.message);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleReject = () => {
    axiosInstance("Adtoken")
      .post(`admin/reject-videos?video=${videoId}`, { rejectionReason })
      .then((res) => {
        setToastMessage(videoId);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setRejectionReason("");
        setVideoId("");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(err.message);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setRejectionReason("");
        setVideoId("");
        onClose();
      });
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/video-list-unlist?video=${id}`)
      .then((res) => {
        setToastMessage(res.data.message);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(err.message);
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
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
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
          {/* <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
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
          </div> */}

          {/* <div className='bg-white p-2 rounded-2xl flex'>
        <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD VIDEOS</button>
      </div> */}
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>

                <Th className="p-3 border" onClick={() => sorting("name")}>
                  Name of video
                </Th>
                <Th
                  className="p-3 border"
                  onClick={() => sortingBranch("name")}
                >
                  Name of subject
                </Th>
                <Th
                  className="p-3 border"
                  onClick={() => sortingBranch("name")}
                >
                  Name of Branch
                </Th>
                <Th
                  className="p-3 border"
                  onClick={() => sortingBranch("name")}
                >
                  Name of Board
                </Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {videos.map((video, index) => (
                <Tr key={index} className="bg-white uppercase">
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{video.video_name}</Td>
                  <Td className="border">{video.subject.name}</Td>
                  <Td className="border">{video.branch.name}</Td>
                  <Td className="border">{video.board.name}</Td>
                  <Td className="border flex justify-start">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl">
                      {" "}
                      <a href={video.video_link} target="_blank">
                        VIEW
                      </a>{" "}
                    </button>
                    {video.approved ? (
                      <>
                        {video.listed ? (
                          <button
                            className="bg-gray-600 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(video._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-blue-400 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(video._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : null}
                    {!video.approved && !video.rejected ? (
                      <button
                        className="bg-green-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleApprove(video._id)}
                      >
                        APPROVE
                      </button>
                    ) : null}
                    {!video.approved && !video.rejected ? (
                      <button
                        className="bg-red-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleOpen(video._id)}
                      >
                        REJECT
                      </button>
                    ) : null}
                    {/* <button
                      className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                      onClick={() => handleEdit(video)}
                    >
                      EDIT
                    </button> */}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reason for rejection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Add the reason</FormLabel>
              <Input
                placeholder="Type here..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleReject}>
              Reject
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MangageVideos;
