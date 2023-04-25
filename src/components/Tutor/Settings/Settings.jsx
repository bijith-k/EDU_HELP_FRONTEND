import React, { useState } from 'react'
import Navbar from '../Dashboard/Navbar';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
   const tutor = useSelector((state) => state.tutor);
   const token = localStorage.getItem("Ttoken");
   const navigate = useNavigate()

   const [showp, setShowp] = useState(false);
   const [showcp, setShowcp] = useState(false);

   const handleClickP = () => setShowp(!showp);
   const handleClickCP = () => setShowcp(!showcp);
   const toast = useToast();

   const [loading, setLoading] = useState(false);
   const [passwords, setPasswords] = useState({
     currentPassword: "",
     newPassword: "",
   });

   const handlePassword = async () => {
     if (!passwords.currentPassword || !passwords.newPassword) {
       return toast({
         title: "Enter passwords",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom-right",
       });
     }
     if (passwords.newPassword.length < 6) {
       return toast({
         title: "Password should be atlest 6 character length",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom-right",
       });
     }

     setLoading(true);

     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };

     await axios
       .post(
         `tutor/change-password?id=${tutor._id}`,
         {
           ...passwords,
         },
         config
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

           setLoading(false);
           setPasswords({
             currentPassword: "",
             newPassword: "",
           });

            localStorage.removeItem("Ttoken");
            navigate("/tutor-signin");
         } else {
           toast({
             title: res.data.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "bottom-right",
           });
           setLoading(false);
           setPasswords({
             currentPassword: "",
             newPassword: "",
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
           position: "bottom-right",
         });
         setLoading(false);
       });
   };

  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="bg-gray-500 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        SETTINGS
      </div>
      <div className="mt-5 w-2/3 mx-auto">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showp ? "text" : "password"}
            placeholder="Enter current password"
            value={passwords.currentPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, currentPassword: e.target.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickP}>
              {showp ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md" className="mt-5">
          <Input
            pr="4.5rem"
            type={showcp ? "text" : "password"}
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, newPassword: e.target.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickCP}>
              {showcp ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          isLoading={loading}
          loadingText="Updating"
          colorScheme="teal"
          variant="solid"
          className="mt-5"
          onClick={handlePassword}
        >
          UPDATE PASSWORD
        </Button>
      </div>
    </div>
  );
}

export default Settings