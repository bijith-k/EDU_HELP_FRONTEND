import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setEventsData } from "../../../features/contentSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EditEvents = () => {
  const event = useSelector((state) => state.contents.events);

  const eDate = new Date(event.endingDate);
  const endDate = eDate.toLocaleDateString("en-GB");
  const sDate = new Date(event.startingDate);
  const startDate = sDate.toLocaleDateString("en-GB");

  const initialValues = {
    name: event.name,
    organizer: event.organizer,
    location: event.location,
    description: event.description,
    startingDate: startDate,
    endingDate: endDate,
    link: event.link,
    contact: event.contact,
  };

  const token = localStorage.getItem("Adtoken");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [newPoster, setNewPoster] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventId = localStorage.getItem("eventId");
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/events?id=${eventId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "res");

        dispatch(
          setEventsData({
            events: res.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    // startingDate:Yup.string().required('Please select the starting date'),
    // endingDate:Yup.string().required('Please select the ending date'),
    link: Yup.string().required(
      "Please add the link or website for registration"
    ),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "contact number is not valid")
      .required("Please enter a contact number"),
    // poster:Yup.mixed()
    // .required('Please select a poster')
    // .test('fileType', 'Unsupported file type', (value) =>
    //   value && ['image/jpeg', 'image/png'].includes(value.type)
    // )
  });

  const { values, setFieldValue, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: eventSchema,
      onSubmit: (values, action) => {
        if (
          newPoster &&
          !["image/jpeg", "image/png"].includes(newPoster.type)
        ) {
          setError("Selected file not supported, select jpeg or png");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(values);
        axios
          .post(
            `${import.meta.env.VITE_BASE_PATH}admin/edit-event?event=${
              event._id
            }`,
            {
              ...values,
              newPoster,
            },
            config
          )
          .then((response) => {
            if (response.data.updated) {
              localStorage.removeItem("eventId");
              navigate("/admin-events");
            } else {
              toast.error(response.data.message, {
                position: "top-center",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Server error");
          });
      },
    });

  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          edit event
        </p>
        <div>
          <form action="" onSubmit={handleSubmit} className="p-3 w-3/4 mx-auto">
            {/* {errors ? <p className=" text-red-500 font-normal bg-white border-2 border-red-500  my-2 w-fit rounded-xl p-2 mx-auto">{errors}</p> : null } */}

            <label htmlFor="eventName" className=" font-medium text-white">
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
            <label htmlFor="organizer" className=" font-medium text-white">
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

            <label htmlFor="location" className=" font-medium text-white">
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

            <label htmlFor="description" className=" font-medium text-white">
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

            <label htmlFor="startingDate" className=" font-medium text-white">
              Choose event starting date(Current selected :{" "}
              {values.startingDate})
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

            <label htmlFor="endingDate" className=" font-medium text-white">
              Choose event ending date(Current selected : {values.endingDate})
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

            <label htmlFor="link" className=" font-medium text-white">
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

            <label htmlFor="contact" className=" font-medium text-white">
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

            <label htmlFor="notes" className=" font-medium text-white">
              Selected poster
            </label>
            <div className="mb-2">
              <img
                src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`}
                className="w-1/5"
              />
            </div>
            <label htmlFor="poster" className=" font-medium block text-white">
              Change poster of the event
            </label>
            <input
              type="file"
              name="newPoster"
              className="w-full bg-white p-2"
              onChange={(e) => {
                setNewPoster(e.target.files[0]);
                setError(null);
              }}
            />
            {error && <div className="text-red-500">{error}</div>}

            <button
              type="submit"
              className="bg-blue-900 p-3 font-semibold text-white rounded-lg mt-2"
            >
              EDIT EVENT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvents;
