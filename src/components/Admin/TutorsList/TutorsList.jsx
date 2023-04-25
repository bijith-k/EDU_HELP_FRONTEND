import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Sidebar from '../Dashboard/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from "../../../axios";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';


const TutorsList = () => {
 const toast = useToast();
 const [tutorId, setTutorId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
const handleOpen = (id) => {
  onOpen();
  setTutorId(id)
};
 const [rejectionReason, setRejectionReason] = useState('')
  const navigate = useNavigate()
  const Token = localStorage.getItem("Adtoken")
  const [tutors, setTutors] = useState([])
  const [toastMessage, setToastMessage] = useState("");
 
  useEffect(() => {
    axios
      .get(`admin/tutors`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTutors(res.data);
      });
      
  }, [toastMessage]);

  const handleBlockUnblock = (id) => {
    axios
      .put(
        `admin/block-unblock-tutor?tutor=${id}`,null,
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
         
        setToastMessage(id);
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
        setToastMessage(id);
        toast({
             title: err.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
      });
  };

  const handleApprove = (id) =>{
      axios.put(`admin/approve-tutor?tutor=${id}`,null,
      {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      ).then((res)=>{
 setToastMessage(id);
        toast({
             title: res.data.message,
             status: "success",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
      }).catch((err)=>{
        console.log(err);
        setToastMessage(id);
        toast({
             title: err.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
      })
  }

   


  const handleReject = () =>{
       
      axios.post(`admin/reject-tutor?tutor=${tutorId}`,{rejectionReason},
      {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      ).then((res)=>{
 setToastMessage(tutorId);
        toast({
             title: res.data.message,
             status: "success",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
            setRejectionReason("");
            setTutorId("");
            onClose();
      }).catch((err)=>{
        console.log(err);
        setToastMessage(tutorId);
        toast({
             title: err.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
            setRejectionReason("");
            setTutorId("");
            onClose();
      })
  }




   
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage tutors
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
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead >
              <Tr className="bg-green-300">
                <Th isNumeric className="p-3 border">
                  No
                </Th>
                <Th className="p-3 border">Name</Th>
                <Th className="p-3 border">Email</Th>
                <Th className="p-3 border">Phone</Th>
                <Th className="p-3 border">Available Time,From</Th>
                <Th className="p-3 border">Available Time,To</Th>
                <Th className="p-3 border">Subjects</Th>
                <Th className="p-3 border">Board</Th>
                <Th className="p-3 border">Branch</Th>
                <Th className="p-3 border">Profession</Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {tutors.map((tutor, index) => (
                <Tr key={tutor._id} className="bg-white ">
                  <Td isNumeric className="border">
                    {index + 1}
                  </Td>
                  <Td className="border uppercase">{tutor.name}</Td>
                  <Td className="border">{tutor.email}</Td>
                  <Td className="border">{tutor.phone}</Td>
                  <Td className="border">{tutor.timeFrom}</Td>
                  <Td className="border">{tutor.timeTo}</Td>
                  <Td className="border">
                    {tutor.subjects.map((sub, index) => (
                      <span key={index}>{sub},</span>
                    ))}
                  </Td>
                  <Td className="border">{tutor.board.name}</Td>
                  <Td className="border">{tutor.branch.name}</Td>
                  <Td className="border">{tutor.profession}</Td>

                  <Td className="border flex justify-center">
                    {!tutor.approved && !tutor.rejected ? (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleApprove(tutor._id)}
                      >
                        APPROVE
                      </button>
                    ) : null}
                    {!tutor.approved && !tutor.rejected ? (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        // onClick={() => handleReject(tutor._id)}
                        onClick={() => handleOpen(tutor._id)}
                      >
                        REJECT
                      </button>
                    ) : null}

                    {tutor.approved ? ( tutor.blocked ? (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleBlockUnblock(tutor._id)}
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleBlockUnblock(tutor._id)}
                      >
                        BLOCK
                      </button>
                    )) : null }
                   
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
}

export default TutorsList
