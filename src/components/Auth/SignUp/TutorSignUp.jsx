import axios from "../../../axios";
import React, { useState, useEffect } from "react";
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

  const [boardError, setBoardError] = useState(null);
  const [branchError, setBranchError] = useState(null);

  useEffect(() => {
    // Fetch boards from server on component mount
    axios
      .get(`auth/boards`)
      .then((res) => setBoards(res.data.board))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      axios
        .get(
          `${
            import.meta.env.VITE_BASE_PATH
          }auth/branches?board=${selectedBoard}`
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
        axios
          .post(`auth/tutor-signup`, {
            ...values,
            board: selectedBoard,
            branch: selectedBranch,
          })
          .then((response) => {
            setIsLoading(false);
            if (response.data.otpSend) {
              toast.success(response.data.message);
              navigate("/tutor-otp");
            } else {
              setIsLoading(false);
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
          });
        // action.resetForm();
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("Ttoken");
    if (token) {
      navigate("/tutor-profile");
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
      <div className="sm:col-span-4   bg-blue-300 min-h-screen flex justify-center items-center flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 mt-10 rounded-2xl shadow-md text-black w-full">
            <form action="" onSubmit={handleSubmit}>
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
              {/* 
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DesktopTimePicker',
        ]}
        value={values.timeFrom}
                onChange={handleChange}
                onBlur={handleBlur} 
      >
        <DemoItem label="Select the time, when you become free" value={values.timeFrom}
                onChange={handleChange}
                onBlur={handleBlur} >
          <DesktopTimePicker defaultValue={dayjs('2022-04-17T15:30')} name='timeFrom'  value={values.timeFrom}
                onChange={handleChange}
                onBlur={handleBlur} className='mb-4 md:w-80 sm:w-full border border-grey-light rounded' />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> */}
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

              {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer
        components={[
          'DesktopTimePicker',
        ]} value={values.timeTo}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <DemoItem label="You are free upto which time ? , select" value={values.timeTo}
                onChange={handleChange}
                onBlur={handleBlur}>
          <DesktopTimePicker defaultValue={dayjs('2022-04-17T15:30')} name='timeTo'  value={values.timeTo}
                onChange={handleChange}
                onBlur={handleBlur} className='mb-4 md:w-80 sm:w-full border border-grey-light rounded' />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> */}
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
              href="/tutor-signin"
            >
              Log in
            </a>
          </div>
          <div className="text-grey-dark mb-5">
            Register as a student?
            <a
              className="no-underline border-b border-white text-yellow"
              href="/signup"
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

export default TutorSignUp;
