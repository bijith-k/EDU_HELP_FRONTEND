import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";


import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";

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

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const toast = useToast();
  const [noteId, setNoteId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (id) => {
    onOpen();
    setNoteId(id);
  };
  const [rejectionReason, setRejectionReason] = useState("");
 

  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  

   

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/notes`)
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
          setNotes(res.data);
        }
        
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, [toastMessage]);

   

  const handleApprove = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/approve-notes?note=${id}`)
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
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
         toast({
           title: res.data.message,
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "top",
         });
        }
        
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
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
      .post(`admin/reject-notes?note=${noteId}`, { rejectionReason })
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
          setToastMessage(`Clicked at ${new Date().toISOString()}`);
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });

          setRejectionReason("");
          setNoteId("");
          onClose();
        }
        
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setRejectionReason("");
        setNoteId("");
        onClose();
      });
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/note-list-unlist?note=${id}`)
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
          setToastMessage(`Clicked at ${new Date().toISOString()}`);
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
        
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
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
          manage notes
        </p>
        

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th className="p-3 border"  >
                  Name of Note
                </Th>
                <Th
                  className="p-3 border"
                   
                >
                  Name of subject
                </Th>
                <Th
                  className="p-3 border"
                   
                >
                  Name of Branch
                </Th>
                <Th
                  className="p-3 border"
                  
                >
                  Name of Board
                </Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {notes.map((note, index) => (
                <Tr key={index} className="bg-white uppercase">
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{note.note_name}</Td>
                  <Td className="border">{note.subject.name}</Td>
                  <Td className="border">{note.branch.name}</Td>
                  <Td className="border">{note.board.name}</Td>
                  <Td className="border flex justify-start">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl">
                      {" "}
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          note.file_path
                        }`}
                        target="_blank"
                      >
                        VIEW
                      </a>{" "}
                    </button>
                    {note.approved ? (
                      <>
                        {note.listed ? (
                          <button
                            className="bg-gray-600 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-blue-400 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : null}

                    {!note.approved && !note.rejected ? (
                      <button
                        className="bg-green-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleApprove(note._id)}
                      >
                        APPROVE
                      </button>
                    ) : null}
                    {!note.approved && !note.rejected ? (
                      <button
                        className="bg-red-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleOpen(note._id)}
                      >
                        REJECT
                      </button>
                    ) : null}
                    
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

export default ManageNotes;
