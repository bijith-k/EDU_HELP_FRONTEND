import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import ragam from "../../../assets/ragam.jpeg";
import { useToast } from "@chakra-ui/react";

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
            console.log(error, "catchhh");
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
    <div className="grid sm:grid-cols-6">
      <div className="sm:col-span-2 bg-gray-700 md:min-h-screen flex flex-col justify-evenly   items-center text-white font-sans uppercase">
        <div>
          <img src={ragam} className="w-32 object-cover md:-mt-14" alt="logo" />
        </div>
        <div className="text-center md:text-5xl text-3xl mt-3 md:-mt-14">
          <p className="font-bold leading-snug">
            WELCOME <br /> TO <br /> EDU-HELP
          </p>
        </div>
        <div>
          <p className="font-bold md:text-3xl text-xl my-5 md:-mt-20 text-center">
            REGISTER TO START THE JOURNEY
          </p>
        </div>
      </div>
      <div className="sm:col-span-4   bg-blue-300  flex justify-center items-center flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-10 md:mt-36 px-2">
          <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
            <h1 className="text-center font-semibold text-xl">ENTER OTP</h1>
            <p className="text-center font-sans font-thin text-xs mb-3">
              CHECK THE INBOX OF GIVEN MOBILE NUMBER FOR OTP
            </p>
            <form action="" onSubmit={handleSubmit}>
              {/* <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="otpEmail"
                placeholder="OTP VIA EMAIL"
                value={values.otpEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.otpEmail && touched.otpEmail ? (
                <p className="form-error text-red-600 mb-2">
                  {errors.otpEmail}
                </p>
              ) : null} */}

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
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
                >
                  VERIFY AND SIGNUP
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpTutor;
