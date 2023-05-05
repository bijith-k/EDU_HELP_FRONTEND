import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { useDispatch } from "react-redux";
import { setQuestionData } from "../../../features/contentSlice";
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

const ManageQuestionPaper = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [questionId, setQuestionId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (id) => {
    onOpen();
    setQuestionId(id);
  };
  const [rejectionReason, setRejectionReason] = useState("");

  const [questions, setQuestions] = useState([]);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();
  const [data, setData] = useState("data hereeeeee");
  const [order, setOrder] = useState("ASC");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/question-papers`)
      .then((res) => {
        setQuestions(res.data);
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
      .get(`admin/approve-question-paper?question=${id}`)
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
      .post(`admin/reject-question-paper?question=${questionId}`, {
        rejectionReason,
      })
      .then((res) => {
        setToastMessage(questionId);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setRejectionReason("");
        setQuestionId("");
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
        setQuestionId("");
        onClose();
      });
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/question-paper-list-unlist?question=${id}`)
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

  // const handleEdit = (question) => {
  //   localStorage.setItem("questionId", question._id);
  //   dispatch(
  //     setQuestionData({
  //       questionPapers: question,
  //     })
  //   );
  //   navigate("/admin-edit-question-papers");
  // };

  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage question papers
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
          <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD question paper</button>
        </div> */}
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th onClick={() => sorting("name")} className="p-3 border">
                  Name of exam
                </Th>
                <Th
                  onClick={() => sortingBranch("name")}
                  className="p-3 border"
                >
                  Name of subject
                </Th>
                <Th
                  onClick={() => sortingBranch("name")}
                  className="p-3 border"
                >
                  Name of Branch
                </Th>
                <Th
                  onClick={() => sortingBranch("name")}
                  className="p-3 border"
                >
                  Name of Board
                </Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {questions.map((question, index) => (
                <Tr key={index} className="bg-white uppercase">
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{question.exam_name}</Td>
                  <Td className="border">{question.subject.name}</Td>
                  <Td className="border">{question.branch.name}</Td>
                  <Td className="border">{question.board.name}</Td>
                  <Td className="border flex justify-start">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl">
                      {" "}
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          question.file_path
                        }`}
                        target="_blank"
                      >
                        VIEW
                      </a>{" "}
                    </button>
                    {question.approved ? (
                      <>
                        {question.listed ? (
                          <button
                            className="bg-gray-600 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(question._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-400 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(question._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : null}
                    {!question.approved && !question.rejected ? (
                      <button
                        className="bg-green-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleApprove(question._id)}
                      >
                        APPROVE
                      </button>
                    ) : null}

                    {!question.approved && !question.rejected ? (
                      <button
                        className="bg-red-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleOpen(question._id)}
                      >
                        REJECT
                      </button>
                    ) : null}
                    {/* <button
                      className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                      onClick={() => handleEdit(question)}
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

export default ManageQuestionPaper;
