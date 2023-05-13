import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import logo from "../../../assets/logoWhite.png";

import { Button, useToast } from "@chakra-ui/react";

const initialValues = {
  otpPhone: "",
  // otpEmail: "",
};

const OtpTutor = () => {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const otpSchema = Yup.object({
    otpPhone: Yup.number().required(
      "Please enter otp received in the given mobile number"
    ),
    // otpEmail: Yup.number().required(
    //   "Please enter otp received in the given email"
    // ),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: otpSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        axiosInstance()
          .post(`auth/verify-tutor-otp`, {
            ...values,
          })
          .then((response) => {
            setIsLoading(false);
            if (response.data.created) {
              toast({
                title: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              navigate("/tutor");
            } else {
              toast({
                title: response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            }
          })
          .catch((error) => {
            setIsLoading(false);
           
            toast({
              title: error.response.data.errors,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
        // action.resetForm();
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("Ttoken");
    if (token) {
      navigate("/tutor/dashboard");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-800 max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
        <img src={logo} className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <p className="font-bold text-3xl">WELCOME TO EDU-HELP</p>
        <p className="uppercase text-center font-medium">
          enter otp to complete registration
        </p>
      </div>
      <div className="container max-w-sm mx-auto flex flex-col items-center mt-10 px-2">
        <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
          <p className="text-center font-sans font-thin text-xs mb-3">
            CHECK THE INBOX OF GIVEN MOBILE NUMBER FOR OTP
          </p>
          <form action="" onSubmit={handleSubmit}>
            

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="otpPhone"
              placeholder="OTP VIA PHONE NUMBER"
              value={values.otpPhone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otpPhone && touched.otpPhone ? (
              <p className="form-error text-red-600 ">{errors.otpPhone}</p>
            ) : null}

            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
            >
              VERIFY AND SIGNUP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpTutor;
