import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import ragam from "../../../assets/ragam.jpeg";
import { setTutor } from "../../../features/tutorSlice";
import { useToast } from "@chakra-ui/react";

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
              localStorage.setItem("Tid", response.data.tutor._id);
              navigate("/tutor/dashboard");
            } else if (response.data.pending) {
              localStorage.setItem("Tid", response.data.tutor._id);
              localStorage.setItem("Ttoken", response.data.token);
              navigate("/tutor/approval-pending");
            } else if (response.data.rejected) {
              localStorage.setItem("Tid", response.data.tutor._id);
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
    <div className="grid sm:grid-cols-6">
      <div className="sm:col-span-2 bg-gray-700 md:min-h-screen flex flex-col justify-evenly   items-center text-white font-sans uppercase">
        <div>
          <img src={ragam} className="w-32 object-cover" alt="logo" />
        </div>
        <div className="text-center md:text-5xl text-3xl mt-3 md:mt-0">
          <p className="font-bold leading-snug">
            WELCOME <br /> TO <br /> EDU-HELP
          </p>
        </div>
        <div>
          <p className="font-bold md:text-3xl text-xl my-5 md:my-0 text-center">
            LOGIN TO START THE JOURNEY
          </p>
        </div>
      </div>
      <div className="sm:col-span-4   bg-blue-300 flex justify-center items-center flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-10 md:mt-36  px-2">
          <div className="bg-white px-6 py-8 mt-10 rounded-2xl shadow-md text-black w-full">
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
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
                >
                  Login
                </button>
              )}
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <a
              className="no-underline border-b border-white text-yellow"
              href="/tutor/signup"
            >
              Signup
            </a>
          </div>
          <div className="text-grey-dark mb-5">
            Login as a student?
            <a
              className="no-underline border-b border-white text-yellow"
              href="/signin"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
