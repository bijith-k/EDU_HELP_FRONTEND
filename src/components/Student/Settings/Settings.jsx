import React, { useState } from 'react'
import Navbar from '../Home/Navbar';
import { Button, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axios from "../../../axios";
import { useNavigate } from 'react-router-dom';


const Settings = () => {
  const student = useSelector((state) => state.student);
  const token = localStorage.getItem("Stoken");
   const navigate = useNavigate()

  const [showp, setShowp] = useState(false);
  const [showcp, setShowcp] = useState(false);

  const handleClickP = () => setShowp(!showp)
  const handleClickCP = () => setShowcp(!showcp);
   const toast = useToast();
  
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    currentPassword:'',
    newPassword:''
  })

  const handlePassword = async() =>{
     
      if(!passwords.currentPassword || !passwords.newPassword){
        return toast({
          title: "Enter passwords",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
      if(passwords.newPassword.length <6){
        return toast({
          title: "Password should be atlest 6 character length",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
      
setLoading(true)

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

      await axios
       .post(
         `change-password?id=${student._id}`,
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
            
          setLoading(false)
          setPasswords({
            currentPassword:'',
            newPassword:''
          })
           localStorage.removeItem("Stoken");
           navigate("/signin");
           
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
  }

  return (
    <div className="h-screen w-full pt-16  overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          HAPPY LEARNING BIJITH
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          SETTINGS
        </h1>
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

      {/* <hr className="my-10 mx-5" />
      <div className="mt-5 w-2/3 mx-auto">

      </div> */}
    </div>
  );
}

export default Settings