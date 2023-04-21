import React from "react";
import Navbar from "../Dashboard/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  organizer: "",
  location: "",
  description: "",
  startingDate: "",
  endingDate: "",
  link: "",
  contact: "",
  poster: "",
};

const AddEvents = () => {
  const navigate = useNavigate();

  const eventSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter the events name"),
    organizer: Yup.string()
      .min(2)
      .max(50)
      .required("Please enter the organizers/institutions name"),
    location: Yup.string().min(2).required("Please enter the location"),
    description: Yup.string()
      .min(2)
      .required("Please add some description of event"),
    startingDate: Yup.string().required("Please select the starting date"),
    endingDate: Yup.string().required("Please select the ending date"),
    link: Yup.string().required(
      "Please add the link or website for registration"
    ),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "contact number is not valid")
      .required("Please enter a contact number"),
    poster: Yup.mixed()
      .required("Please select a poster")
      .test(
        "fileType",
        "Unsupported file type",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const { values, setFieldValue, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: eventSchema,
      onSubmit: (values, action) => {
        const token = localStorage.getItem("Ttoken");
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(values);
        axios
          .post(
            `tutor/add-event`,
            {
              ...values,
            },
            config
          )
          .then((response) => {
            if (response.data.added) {
              // toast.success(response.data.message);
              navigate("/tutor-dashboard");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.errors);
          });
      },
    });

  return (
    <div className="bg-slate-400 min-h-screen w-full">
      <Navbar />
      <div className="">
        <div className="bg-gray-500">
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            add events
          </h1>
        </div>
        <form action="" onSubmit={handleSubmit} className="p-3 w-3/4 mx-auto">
          {/* {errors ? <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">{errors}</p> : null } */}

          <label htmlFor="eventName" className=" font-medium">
            Enter the name of event
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 mb-2"
            placeholder="Type here..............."
            value={values.name}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("name", e.target.value);
            }}
          />
          {touched.name && errors.name && <div className="text-white">{errors.name}</div>}
          <label htmlFor="organizer" className=" font-medium">
            Enter the name of organizer
          </label>
          <input
            type="text"
            name="organizer"
            className="w-full p-3 mb-2"
            placeholder="Type here..............."
            value={values.organizer}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("organizer", e.target.value);
            }}
          />
          {touched.organizer && errors.organizer && (
            <div className="text-white">{errors.organizer}</div>
          )}

          <label htmlFor="location" className=" font-medium">
            Enter the location
          </label>
          <input
            type="text"
            name="location"
            className="w-full p-3 mb-2"
            placeholder="Type here..............."
            value={values.location}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("location", e.target.value);
            }}
          />
          {touched.location && errors.location && <div className="text-white">{errors.location}</div>}

          <label htmlFor="description" className=" font-medium">
            Write a short description about the event
          </label>
          {/* <input
        type="text"
        name="description"
        className="w-full p-3 h-40 mb-2"
        placeholder="Type here..............."
        // value={notesData.noteName}
        // onChange={(e) =>
        //  { setNotesData({ ...notesData, noteName: e.target.value })
        //  setErrors(null)}
        // }
      />   */}
          <textarea
            name="description"
            id=""
            className="w-full p-3 mb-2"
            rows="3"
            value={values.description}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("description", e.target.value);
            }}
          ></textarea>
          {touched.description && errors.description && (
            <div className="text-white">{errors.description}</div>
          )}

          <label htmlFor="startingDate" className=" font-medium">
            Event starting date
          </label>
          <input
            type="date"
            name="startingDate"
            className="w-full p-3 mb-2"
            value={values.startingDate}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("startingDate", e.target.value);
            }}
          />
          {touched.startingDate && errors.startingDate && (
            <div className="text-white">{errors.startingDate}</div>
          )}

          <label htmlFor="endingDate" className=" font-medium">
            Event ending date
          </label>
          <input
            type="date"
            name="endingDate"
            className="w-full p-3 mb-2"
            value={values.endingDate}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("endingDate", e.target.value);
            }}
          />
          {touched.endingDate && errors.endingDate && (
            <div className="text-white">{errors.endingDate}</div>
          )}

          <label htmlFor="link" className=" font-medium">
            Paste the registration link/website
          </label>
          <input
            type="text"
            name="link"
            className="w-full p-3 mb-2"
            placeholder="Paste here..............."
            value={values.link}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("link", e.target.value);
            }}
          />
          {touched.link && errors.link && <div className="text-white">{errors.link}</div>}

          <label htmlFor="contact" className=" font-medium">
            Contact number
          </label>
          <input
            type="text"
            name="contact"
            className="w-full p-3 mb-2"
            placeholder="Type here..............."
            value={values.contact}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("contact", e.target.value);
            }}
          />
          {touched.contact && errors.contact && <div className="text-white">{errors.contact}</div>}

          <label htmlFor="poster" className=" font-medium block">
            Poster of the event
          </label>
          <input
            type="file"
            name="poster"
            className="w-full bg-white p-2"
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue("poster", e.target.files[0]);
            }}
          />
          {touched.poster && errors.poster && <div className="text-white">{errors.poster}</div>}

          <p>
            {" "}
            *These events will be published only <br /> after admin verification
          </p>

          <button
            type="submit"
            className="bg-blue-900 p-3 font-semibold text-white rounded-lg mt-2"
          >
            ADD EVENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
