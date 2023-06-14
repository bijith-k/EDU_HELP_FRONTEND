import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FiPhoneIncoming, FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { BsSignIntersectionSide, BsImage } from "react-icons/bs";
import {
  MdAccessTime,
  MdLocationOn,
  MdSubject,
  MdWork,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Dashboard/Navbar";
import { setTutor } from "../../../features/tutorSlice";
import Footer from "../Footer/Footer";

const EditProfile = () => {
  const { tutor } = useSelector((state) => state.tutor);

  

  const [selectedBoard, setSelectedBoard] = useState(tutor.board.name);
  const [selectedBranch, setSelectedBranch] = useState(tutor.branch.name);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 useEffect(() => {
   if (tutor.approved == false && tutor.rejected == false) {
     navigate("/tutor/approval-pending");
   } else if (tutor.rejected) {
     navigate("/tutor/approval-rejected");
   } else if (tutor.blocked) {
     localStorage.removeItem("Ttoken");
     navigate("/tutor");
     toast({
       title: "Blocked",
       description: "Your account is blocked by the admin",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "top",
     });
   }
 }, []);

  const [userData, setUserData] = useState({
    name: tutor.name,
    email: tutor.email,
    phone: tutor.phone,
    subjects: tutor.subjects,
    timeFrom: tutor.timeFrom,
    timeTo: tutor.timeTo,
    place: tutor.place,
    profession: tutor.profession,
    profilePic: tutor.profilePic,
  });

  const [loading, setLoading] = useState(false);

   


  const handleSubmit = async (e) => {
    let nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-']+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ-']+)*$/;
    let emailRegex = /^\S+@\S+\.\S+$/;
    let phoneRegex = /^[789]\d{9}$/;
 
    if (
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.subjects ||
      !userData.timeFrom ||
      !userData.timeTo ||
      !userData.place ||
      !nameRegex.test(userData.name) ||
      !nameRegex.test(userData.place) ||
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

    await axiosInstance("Ttoken")
      .post(
        `tutor/edit-profile-details?id=${tutor._id}`,
        {
          ...userData
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

          dispatch(setTutor({ tutor: res.data.tutor }));
          setLoading(false);
          navigate("/tutor/dashboard");
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
    <div className="bg-gray-50 min-h-screen max-w-screen-2xl mx-auto">
      <Navbar />
      <div className="bg-gray-600 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        UPDATE DETAILS
      </div>
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
          <Input
            type="text"
            value={selectedBoard}
            placeholder="Board"
            readOnly
            className="uppercase"
          />
           
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BsSignIntersectionSide color="gray.300" />}
          />
          <Input
            type="text"
            value={selectedBranch}
            placeholder="Branch"
            readOnly
            className="uppercase"
          />
           
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdSubject color="gray.300" />}
          />
          <Input
            type="text"
            value={userData.subjects}
            onChange={(event) =>
              setUserData({ ...userData, subjects: event.target.value })
            }
            placeholder="Subjects you can handle"
          />
        </InputGroup>
        <label htmlFor="timeFrom" className="-mb-4">
          Select the time, when you become free
        </label>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdAccessTime color="gray.300" />}
          />

          <Input
            type="time"
            value={userData.timeFrom}
            onChange={(event) =>
              setUserData({ ...userData, timeFrom: event.target.value })
            }
            placeholder="Time from you are free"
          />
        </InputGroup>
        <label htmlFor="timeTo" className="-mb-4">
          Select the time, when you are free upto
        </label>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdAccessTime color="gray.300" />}
          />

          <Input
            type="time"
            value={userData.timeTo}
            onChange={(event) =>
              setUserData({ ...userData, timeTo: event.target.value })
            }
            placeholder="Time upto you are free"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdWork color="gray.300" />}
          />

          <Input
            type="text"
            value={userData.profession}
            
            placeholder="your profession"
            readOnly
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdLocationOn color="gray.300" />}
          />

          <Input
            type="text"
            value={userData.place}
            onChange={(event) =>
              setUserData({ ...userData, place: event.target.value })
            }
            placeholder="Enter your place"
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
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
