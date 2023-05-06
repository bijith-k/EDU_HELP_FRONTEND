import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import logo from "../../../assets/logoWhite.png";

import { setTutor } from "../../../features/tutorSlice";
import { Button, useToast } from "@chakra-ui/react";

const initialValues = {
  email: "",
  password: "",
};
const TutorLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const signUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        axiosInstance()
          .post(`auth/tutor-signin`, {
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
              dispatch(setTutor({ tutor: response.data.tutor }));
              localStorage.setItem("Ttoken", response.data.token);
               
              navigate("/tutor/dashboard");
            } else if (response.data.pending) {
            
              localStorage.setItem("Ttoken", response.data.token);
              navigate("/tutor/approval-pending");
            } else if (response.data.rejected) {
               
              localStorage.setItem("Ttoken", response.data.token);
              navigate("/tutor/approval-rejected");
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
              title: error.message,
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
        <p className="uppercase text-center font-medium">sign in to continue</p>
        <p className="uppercase text-center font-normal">happy teaching</p>
      </div>
      <div className="container max-w-sm mx-auto flex flex-col items-center mt-5  px-2">
        <div className="bg-white px-6 py-8 rounded-2xl shadow-md text-black w-full">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error text-red-600">{errors.email}</p>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error text-red-600">{errors.password}</p>
            ) : null}

            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
            >
              SIGN IN
            </Button>
          </form>
        </div>

        <div className="text-white mt-6">
          Don't have an account?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/tutor/signup"
          >
            Signup
          </a>
        </div>
        <div className="text-white mb-5">
          Login as a student?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/signin"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
