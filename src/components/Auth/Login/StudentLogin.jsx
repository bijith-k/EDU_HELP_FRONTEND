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
  email: "",
  password: "",
};

const StudentLogin = () => {
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
          .post(`auth/signin`, {
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
              dispatch(setStudent({ student: response.data.student }));
              localStorage.setItem("Stoken", response.data.token);
              navigate("/");
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
    const token = localStorage.getItem("Stoken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      {/* //   <div className="sm:col-span-2 bg-gray-700 md:min-h-screen flex flex-col justify-evenly   items-center text-white font-sans uppercase">
    //     <div>
    //       <img src={ragam} className="w-32 object-cover" alt="logo" />
    //     </div>
    //     <div className="text-center md:text-5xl text-3xl mt-3 md:mt-0">
    //       <p className="font-bold leading-snug">
    //         WELCOME <br /> TO <br /> EDU-HELP
    //       </p>
    //     </div>
    //     <div>
    //       <p className="font-bold md:text-3xl text-xl my-5 md:my-0">
    //         LOGIN TO EXPLORE
    //       </p>
    //     </div>
    //   </div> */}
      <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
        <img src={logo} className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <p className="font-bold text-3xl">WELCOME TO EDU-HELP</p>
        <p className="uppercase text-center font-medium">sign in to continue</p>
      </div>
      {/* <div className="sm:col-span-4   bg-blue-300  flex justify-center items-center flex-col"> */}
      <div className="container max-w-sm mx-auto flex flex-col items-center mt-10  px-2">
        <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
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
            href="/signup"
          >
            Signup
          </a>
        </div>
        <div className="text-white mb-5">
          Sign in as a tutor?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/tutor"
          >
            Sign in
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default StudentLogin;
