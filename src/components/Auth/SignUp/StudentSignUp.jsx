import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logoWhite.png";
import { Button, useToast } from "@chakra-ui/react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  school: "",
  place: "",
  password: "",
};

const StudentSignUp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();
  const toast = useToast()

  const [boardError, setBoardError] = useState(null);
  const [branchError, setBranchError] = useState(null);

  useEffect(() => {
    // Fetch boards from server on component mount
    axiosInstance()
      .get(`auth/boards`)
      .then((res) => setBoards(res.data.board))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      setSelectedBranch('')
      axiosInstance()
        .get(
          `auth/branches?board=${selectedBoard}`
        )
        .then((res) => {
          setBranches(res.data.branches);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBranches([]);
    }
  }, [selectedBoard]);

  const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number is not valid")
      .required("Please enter your mobile number"),
    school: Yup.string().required("Please enter your institutions name"),
    place: Yup.string().required("Please enter your place"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        if (!selectedBoard) {
          setBoardError("Please select a board");
          return;
        }
        if (!selectedBranch) {
          setBranchError("Please select a branch");
          return;
        }
        setIsLoading(true);
        axiosInstance()
          .post(`auth/signup`, {
            ...values,
            board: selectedBoard,
            branch: selectedBranch,
          })
          .then((response) => {
            setIsLoading(false);
            if (response.data.otpSend) {
             toast({
               title: response.data.message,
               status: "success",
               duration: 5000,
               isClosable: true,
               position: "top",
             });
              navigate("/otp");
            } else {
              setIsLoading(false);
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
            console.log(error);
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
    const token = localStorage.getItem("Stoken");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
       
      <div className="text-white mt-5 max-w-sm mx-auto p-3 rounded-2xl">
        <img src={logo} className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <p className="font-bold text-3xl">WELCOME TO EDU-HELP</p>
        <p className="uppercase text-center font-medium">register to explore</p>
      </div>
      {/* <div className="sm:col-span-4   bg-blue-300 min-h-screen flex justify-center items-center flex-col"> */}
      <div className="container max-w-2xl mx-auto flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 mt-6 rounded-2xl shadow-md text-black w-full">
          <form action="" onSubmit={handleSubmit}>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
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
              </div>
              <div className="md:w-1/2 md:pr-2">
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
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
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
              </div>
              <div className="md:w-1/2 md:pr-2">
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
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <select
                  name="board"
                  value={selectedBoard}
                  onChange={(e) => {
                    setSelectedBoard(e.target.value);
                    setBoardError(null);
                  }}
                  // onBlur={handleBlur}
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                >
                  <option
                    value=""
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    disabled
                  >
                    Select Board/University
                  </option>
                  {boards.map((board) => (
                    <option
                      key={board._id}
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      value={board._id}
                    >
                      {board.name}
                    </option>
                  ))}
                </select>

                {boardError ? (
                  <p className="form-error text-red-600">{boardError}</p>
                ) : null}
              </div>
              <div className="md:w-1/2 md:pr-2">
                <select
                  name="branch"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    setBranchError(null);
                  }}
                  // onBlur={handleBlur}
                >
                  <option
                    value=""
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    disabled
                  >
                    Select Class/Branch
                  </option>
                  {branches.map((branch) => (
                    <option
                      value={branch._id}
                      key={branch._id}
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                    >
                      {branch.name}
                    </option>
                  ))}
                </select>
                {branchError ? (
                  <p className="form-error text-red-600">{branchError}</p>
                ) : null}
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
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
              </div>
              <div className="md:w-1/2 md:pr-2">
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
              </div>
            </div>
            

            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
            >
              CREATE ACCOUNT
            </Button>
          </form>
        </div>

        <div className="text-white mt-6">
          Already have an account?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/signin"
          >
            Log in
          </a>
        </div>
        <div className="text-white mb-5">
          Register as a tutor?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/tutor/signup"
          >
            Register
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default StudentSignUp;
