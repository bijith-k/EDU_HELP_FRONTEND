import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";

const Settings = () => {
  const { student } = useSelector((state) => state.student);
  const token = localStorage.getItem("Stoken");
  const navigate = useNavigate();

  const [showp, setShowp] = useState(false);
  const [showcp, setShowcp] = useState(false);

  const handleClickP = () => setShowp(!showp);
  const handleClickCP = () => setShowcp(!showcp);
  const toast = useToast();
 

  const [loading, setLoading] = useState(false);
  const [otpButtonLoading, setOtpButtonLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

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
    if (!email) {
      return toast({
        title: "Enter email to get otp for verification",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    if (!otp) {
      return toast({
        title: "Enter otp got in email to continue",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    
    setLoading(true);

    await axiosInstance("Stoken")
      .post(`change-password?id=${student._id}`, {
        ...passwords,otp
      })
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
          setEmail('')
          setOtp('')
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
          // setPasswords({
          //   currentPassword: "",
          //   newPassword: "",
          // });
          // setEmail("");
          // setOtp("");
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

  const getOtp = async() =>{

    let emailRegex = /^\S+@\S+\.\S+$/;
    if(!email || !emailRegex.test(email)){
      return toast({
        title: "Enter email",
        description: "Enter valid email only.Otp will be sent to that email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setOtpButtonLoading(true);
    await axiosInstance("Stoken")
      .post(`get-password-change-otp`,{email})
      .then((res) => {
        if (res.data.otpSend) {
         
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          setOtpButtonLoading(false)

        } else {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
                   setOtpButtonLoading(false);

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
                  setOtpButtonLoading(false);

      });
  }
  return (
    <div className="min-h-screen w-full pt-16 bg-white overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"settings"} />
      <div className="mt-5 w-2/3 h-screen mx-auto">
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
        <InputGroup size="md" className="my-5">
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

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FiMail color="gray.300" />}
          />
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email to get otp"
          />
          <InputRightElement width="7.5rem">
            <Button
              isLoading={otpButtonLoading}
              h="1.75rem"
              size="sm"
              className="mr-1"
              colorScheme="teal"
              variant="solid"
              onClick={getOtp}
            >
              Click to get otp
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md" className="mt-5">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Enter the otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
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
};

export default Settings;
