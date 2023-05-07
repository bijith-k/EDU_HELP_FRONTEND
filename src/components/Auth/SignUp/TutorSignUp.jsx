import axiosInstance from "../../../axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logoWhite.png";
import { useToast } from "@chakra-ui/react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subjects: "",
  timeFrom: "",
  timeTo: "",
  place: "",
  profession: "",
  password: "",
};

const TutorSignUp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
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
    subjects: Yup.string().required("Please enter subjects you can handle"),
    timeFrom: Yup.string().required(
      "Please enter the time when you become free"
    ),
    timeTo: Yup.string().required("Please enter the time upto you are free"),
    profession: Yup.string().required("Please enter your profession"),
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
          .post(`auth/tutor-signup`, {
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
              navigate("/tutor/otp");
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
      <div className="text-white mt-5 max-w-sm mx-auto p-3 rounded-2xl">
        <img src={logo} className="w-20 h-20 mx-auto mb-4" alt="logo" />
        <p className="font-bold text-3xl">WELCOME TO EDU-HELP</p>
        <p className="uppercase text-center font-medium">
          register to start the journey
        </p>
      </div>
      <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 mt-10 rounded-2xl shadow-md text-black w-full">
          <form action="" onSubmit={handleSubmit}>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-gray-light w-full p-3 rounded mb-4"
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
                <label htmlFor="timeFrom">
                  Select the time, when you become free
                </label>
                <input
                  type="time"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="timeFrom"
                  placeholder="Enter the time, when you become free"
                  // onChange={handleChange}
                  value={values.timeFrom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.timeFrom && touched.timeFrom ? (
                  <p className="form-error text-red-600">{errors.timeFrom}</p>
                ) : null}
              </div>
              <div className="md:w-1/2 md:pr-2">
                <label htmlFor="timeTo">
                  Select the time, when you are free upto
                </label>
                <input
                  type="time"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="timeTo"
                  // onChange={handleChange}
                  value={values.timeTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.timeTo && touched.timeTo ? (
                  <p className="form-error text-red-600">{errors.timeTo}</p>
                ) : null}
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="subjects"
                  placeholder="Subjects you can handle"
                  // onChange={handleChange}
                  value={values.subjects}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.subjects && touched.subjects ? (
                  <p className="form-error text-red-600">{errors.subjects}</p>
                ) : null}
              </div>
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="profession"
                  placeholder="Profession"
                  // onChange={handleChange}
                  value={values.profession}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.profession && touched.profession ? (
                  <p className="form-error text-red-600">{errors.profession}</p>
                ) : null}
              </div>
            </div>

            

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

            <button
              isLoading={isLoading}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-300 focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-white mt-6">
          Already have an account?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/tutor"
          >
            Log in
          </a>
        </div>
        <div className="text-white mb-5">
          Register as a student?
          <a
            className="no-underline border-b ml-2 border-white text-yellow"
            href="/signup"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorSignUp;
