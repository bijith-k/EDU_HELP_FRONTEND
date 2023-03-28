import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ragam from "../../../assets/ragam.jpeg";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  branch: "",
  board: "",
  school: "",
  place: "",
  password: "",
};

const StudentSignUp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number is not valid")
      .required("Please enter your mobile number"),
    branch: Yup.string().required("Please select your class/branch"),
    board: Yup.string().required("Please select your board/university"),
    school: Yup.string().required("Please enter your institutions name"),
    place: Yup.string().required("Please enter your place"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        axios
          .post("http://localhost:4000/auth/signup", {
            ...values,
          })
          .then((response) => {
            setIsLoading(false);
            toast.success(response.data.message);
            navigate("/signin");
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(error.response.data.errors);
          });
        action.resetForm();
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("Stoken");
    if (token) {
      navigate("/");
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
          <p className="font-bold md:text-3xl text-xl my-5 md:-mt-20">
            REGISTER TO EXPLORE
          </p>
        </div>
      </div>
      <div className="sm:col-span-4   bg-blue-300 min-h-screen flex justify-center items-center flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 mt-10 rounded-2xl shadow-md text-black w-full">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Name"
                // onChange={handleChange}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p className="form-error text-red-600">{errors.name}</p>
              ) : null}
              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                // onChange={handleChange}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="form-error text-red-600">{errors.email}</p>
              ) : null}

              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phone"
                placeholder="Mobile Number"
                // onChange={handleChange}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? (
                <p className="form-error text-red-600">{errors.phone}</p>
              ) : null}

              <select
                name="board"
                value={values.board}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block border border-grey-light w-full p-3 rounded mb-4"
              >
                <option
                  value=""
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  disabled
                >
                  Select Board/University
                </option>
                <option
                  value="state"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  State Board
                </option>
                <option
                  value="cu/mgu/ku"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  CU/MGU/KU
                </option>
                <option
                  value="ktu"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  KTU
                </option>
              </select>
              {errors.board && touched.board ? (
                <p className="form-error text-red-600">{errors.board}</p>
              ) : null}

              <select
                name="branch"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={values.branch}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option
                  value=""
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  disabled
                >
                  Select Class/Branch
                </option>
                <option
                  value="1-10"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  1-10
                </option>
                <option
                  value="11-12"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  11-12
                </option>
                <option
                  value="ece"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  ECE
                </option>
                <option
                  value="physics"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  Physics
                </option>
                <option
                  value="chemistry"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  Chemistry
                </option>
              </select>
              {errors.branch && touched.branch ? (
                <p className="form-error text-red-600">{errors.branch}</p>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="school"
                placeholder="School or College"
                // onChange={handleChange}
                value={values.school}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.school && touched.school ? (
                <p className="form-error text-red-600">{errors.school}</p>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="place"
                placeholder="Place"
                // onChange={handleChange}
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <p className="form-error text-red-600">{errors.place}</p>
              ) : null}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                // onChange={handleChange}
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
                  Create Account
                </button>
              )}
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-white text-yellow"
              href="/signin"
            >
              Log in
            </a>
          </div>
          <div className="text-grey-dark mb-5">
            Register as a tutor?
            <a
              className="no-underline border-b border-white text-yellow"
              href="/tutor-signup"
            >
              Register
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentSignUp;
