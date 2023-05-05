import React from "react";
import Navbar from "../Home/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";

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
  const toast = useToast();

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
        axiosInstance("Stoken")
          .post(
            `add-event`,
            {
              ...values,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            if (response.data.added) {
              toast({
                title: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });

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
            console.log(error);
            toast({
              title: error.response.data.errors,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      },
    });
  return (
    <div className="bg-[#d4d8f0]  min-h-screen max-w-screen-2xl mx-auto pt-16 w-full overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"add events"} />
      {/* <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          add events
        </h1>
      </div> */}
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
        {touched.name && errors.name && (
          <div className="text-red-500">{errors.name}</div>
        )}
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
          <div className="text-red-500">{errors.organizer}</div>
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
        {touched.location && errors.location && (
          <div className="text-red-500">{errors.location}</div>
        )}

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
          placeholder="Type here...."
          onBlur={handleBlur}
          onChange={(e) => {
            setFieldValue("description", e.target.value);
          }}
        ></textarea>
        {touched.description && errors.description && (
          <div className="text-red-500">{errors.description}</div>
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
          <div className="text-red-500">{errors.startingDate}</div>
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
          <div className="text-red-500">{errors.endingDate}</div>
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
        {touched.link && errors.link && (
          <div className="text-red-500">{errors.link}</div>
        )}

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
        {touched.contact && errors.contact && (
          <div className="text-red-500">{errors.contact}</div>
        )}

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
        {touched.poster && errors.poster && (
          <div className="text-red-500">{errors.poster}</div>
        )}

        <p className="mt-2">
          {" "}
          *These events will be published only <br /> after admin verification
        </p>

        <button
          type="submit"
          className="bg-[#232946] p-3 font-semibold text-white rounded-lg mt-2"
        >
          ADD EVENT
        </button>
      </form>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default AddEvents;
