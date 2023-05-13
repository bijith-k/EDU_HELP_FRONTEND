import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { FiPhoneIncoming, FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { BsSignIntersectionSide, BsImage } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";

const UpdateProfile = () => {
  const { student } = useSelector((state) => state.student);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(student.board._id);
  const [selectedBranch, setSelectedBranch] = useState(student.branch._id);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    school: student.school,
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance("Stoken")
      .get(`boards`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setBoards(res.data.boards);
        }
      })
      .catch((err) => {
         
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      axiosInstance("Stoken")
        .get(`${import.meta.env.VITE_BASE_PATH}branches?board=${selectedBoard}`)
        .then((res) => {
          if (res.data.status == false) {
            localStorage.removeItem("Stoken");
            navigate("/signin");
          } else {
            setBranches(res.data.branches);
          }
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
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.school ||
      !selectedBoard ||
      !selectedBranch ||
      !nameRegex.test(userData.name) ||
      !emailRegex.test(userData.email) ||
      !phoneRegex.test(userData.phone)
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

    if (
      userData.profilePic &&
      userData.profilePic.type !== "image/png" &&
      userData.profilePic.type !== "image/jpeg"
    ) {
      return toast({
        title: "Select only image for profile picture",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setLoading(true);

    await axiosInstance("Stoken")
      .post(
        `edit-profile-details?id=${student._id}`,
        {
          ...userData,
          board: selectedBoard,
          branch: selectedBranch,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        if (res.data.updated) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          dispatch(setStudent({ student: res.data.student }));

          setLoading(false);
        } else {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          setLoading(false);
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
      });
  };

  return (
    <Stack spacing={4} className="mt-5 w-2/3 mx-auto">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BsFillPersonFill color="gray.300" />}
        />
        <Input
          type="text"
          value={userData.name}
          onChange={(event) =>
            setUserData({ ...userData, name: event.target.value })
          }
          placeholder="Name"
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FiMail color="gray.300" />}
        />
        <Input
          type="email"
          value={userData.email}
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
          placeholder="Email"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FiPhoneIncoming color="gray.300" />}
        />
        <Input
          type="tel"
          value={userData.phone}
          onChange={(event) =>
            setUserData({ ...userData, phone: event.target.value })
          }
          placeholder="Phone number"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<HiOutlineBuildingLibrary color="gray.300" />}
        />
        <Select
          placeholder="Select Board"
          value={selectedBoard}
          onChange={(e) => {
            setSelectedBoard(e.target.value);
            setErrors(null);
          }}
          className="pl-10 uppercase"
        >
          {boards.map((board) => (
            <option
              value={board._id}
              key={board._id}
              className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"
            >
              {board.name}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BsSignIntersectionSide color="gray.300" />}
        />
        <Select
          placeholder="Select Branch"
          value={selectedBranch}
          onChange={(e) => {
            setSelectedBranch(e.target.value);

            setErrors(null);
          }}
          className="pl-10 uppercase"
        >
          {branches.map((branch) => (
            <option
              value={branch._id}
              key={branch._id}
              className="block border border-grey-light w-full p-3 rounded mb-4"
            >
              {branch.name}
            </option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<MdOutlineSchool color="gray.300" />}
        />
        <Input
          type="text"
          value={userData.school}
          onChange={(event) =>
            setUserData({ ...userData, school: event.target.value })
          }
          placeholder="School or College Name"
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BsImage color="gray.300" />}
        />
        <Input
          type="file"
          name="profilePic"
          accept="image/*"
          placeholder="Dp"
          onChange={(e) => {
            setUserData({ ...userData, profilePic: e.target.files[0] });
          }}
          className="pt-1"
        />
      </InputGroup>
      <Button
        isloading={loading}
        loadingText="Updating"
        colorScheme="teal"
        variant="solid"
        onClick={handleSubmit}
      >
        UPDATE PROFILE
      </Button>
    </Stack>
  );
};

export default UpdateProfile;
