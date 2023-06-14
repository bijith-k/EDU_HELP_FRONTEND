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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { useState } from "react";
 

const Rejected = () => {
  const navigate = useNavigate();
  const { tutor } = useSelector((state) => state.tutor);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(tutor.board._id);
  const [selectedBranch, setSelectedBranch] = useState(tutor.branch._id);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: tutor.name,
    email: tutor.email,
    phone: tutor.phone,
    place: tutor.place,
    timeFrom: tutor.timeFrom,
    timeTo: tutor.timeTo,
    subjects: tutor.subjects,
    profession: tutor.profession,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance()
      .get(`auth/boards`)
      .then((res) => setBoards(res.data.board))
      .catch((err) =>
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      );
  }, []);
  useEffect(() => {
    if (selectedBoard) {
      setSelectedBranch("");
      axiosInstance()
        .get(`auth/branches?board=${selectedBoard}`)
        .then((res) => {
          setBranches(res.data.branches);
        })
        .catch((error) => {
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

  const handleSubmit = async (e) => {
    let nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-']+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ-']+)*$/;
    let emailRegex = /^\S+@\S+\.\S+$/;
    let phoneRegex = /^[789]\d{9}$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subjects ||
      !formData.timeFrom ||
      !formData.timeTo ||
      !formData.profession ||
      !selectedBoard ||
      !selectedBranch ||
      !formData.place ||
      !nameRegex.test(formData.name) ||
      !nameRegex.test(formData.place) ||
      !nameRegex.test(formData.profession) ||
      !emailRegex.test(formData.email) ||
      !phoneRegex.test(formData.phone)
    ) {
      return toast({
        title: "Enter correct details",
        description: "All fields are required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setLoading(true);

    await axiosInstance("Ttoken")
      .post(`tutor/reapply`, {
        ...formData,
        board: selectedBoard,
        branch: selectedBranch,
      })
      .then((res) => {
        if (res.data.submitted) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
           
          setLoading(false);
          onClose();
          localStorage.removeItem("Ttoken");
          navigate("/tutor");
        } else {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          setLoading(false);
          onClose();
        }
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        setLoading(false);
        onClose();
      });
  };
  return (
    <div className="bg-green-200 min-h-screen max-w-screen-2xl mx-auto flex flex-col">
      <div className="bg-red-600">
        <p className="text-center font-semibold uppercase text-xl p-10 text-white">
          request is rejected
        </p>
      </div>
      <div className="flex flex-col  justify-center items-center bg-slate-400 h-screen">
        <p className="font-bold text-2xl text-center">
          Your request to register as a tutor at EDU-HELP is rejected due to
        </p>
        <p className="font-bold text-2xl text-center text-white">
          {tutor.rejection_reason}
        </p>

        <div>
          <Button onClick={onOpen} className="mt-10">
            Edit your application
          </Button>
          {/* <Button ml={4} ref={finalRef}>
            I'll receive focus on close
          </Button> */}
        </div>
        <button
          className="mt-10 bg-red-600 text-white p-3 rounded-md"
          onClick={() => {
            localStorage.removeItem("Ttoken");
            navigate("/tutor");
          }}
        >
          LOGOUT
        </button>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter your mobile number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Place</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter your place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select Board/University</FormLabel>
              <select
                name="board"
                value={selectedBoard}
                onChange={(e) => {
                  setSelectedBoard(e.target.value);
                }}
                className="block border border-grey-light w-full p-3 rounded mb-4 "
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
                    key={board._id}
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={board._id}
                  >
                    {board.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormControl>
              <FormLabel>Select Class/Branch</FormLabel>
              <select
                name="branch"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                }}
              >
                <option
                  value=""
                  className="block border border-grey-light w-full p-3 rounded mb-4"
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
            </FormControl>
            <FormControl>
              <FormLabel> Select the time, when you become free</FormLabel>
              <Input
                type="time"
                name="timeFrom"
                value={formData.timeFrom}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select the time, when you are free upto</FormLabel>
              <Input
                type="time"
                name="timeTo"
                value={formData.timeTo}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Subjects you can handle</FormLabel>
              <Input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter your profession</FormLabel>
              <Input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isloading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Rejected;
