import React, { useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import UploadedNotes from "./UploadedNotes";
import UploadedQuestions from "./UploadedQuestions";
import { UploadedVideos } from "./UploadedVideos";
import { setTutor } from "../../../features/tutorSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";

const Uploads = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  useEffect(() => {
    const token = localStorage.getItem("Ttoken");
    console.log(token, "tok");

    if (token) {
      const fetchTutorData = async () => {
        try {
          const { data } = await axios.post(
            `tutor`,
            { token }
          );
          console.log(data, "data");
          if (data.status) {
            dispatch(
              setTutor({
                _id:data.tutor._id,
                name: data.tutor.name,
                email: data.tutor.email,
                phone: data.tutor.phone,
                subjects: data.tutor.subjects,
                timeFrom: data.tutor.timeFrom,
                timeTo: data.tutor.timeTo,
                profession: data.tutor.profession,
                status:data.tutor.status,
                token: data.token,
              })
            );
          } else {
            localStorage.removeItem("Ttoken");
            navigate("/tutor-signin");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchTutorData();
    } else {
      navigate("/tutor-signin");
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-600 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-500 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        your uploads
      </div>
      <div
        className="flex flex-col  w-full h-80  break-words "
        id="container"
      >
        <div className="flex" id="bloc-tabs">
          <div
            className={
              toggleState === 1
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs active-tabs"
            onClick={() => toggleTab(1)}
          >
            NOTES
          </div>
          <div
            className={
              toggleState === 2
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs"
            onClick={() => toggleTab(2)}
          >
            VIDEOS
          </div>
          <div
            className={
              toggleState === 3
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs"
            onClick={() => toggleTab(3)}
          >
            QUESTION PAPERS
          </div>
        </div>

        <div className="flex-grow" id="content-tabs">
          <div
            className={
              toggleState === 1
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full h-screen hidden"
            }
            id="content active-content"
          >
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-1 justify-items-center mt-10">
              {/* <div className="py-10"> */}
                 <UploadedNotes />
              {/* </div> */}
              {/* <div className="py-10">
                <div className="rounded overflow-hidden shadow-lg  max-w-sm">
                  <img
                    src="https://www.pexels.com/photo/black-nikon-dslr-camera-on-white-book-9222655/"
                    alt="img"
                    className=""
                  />
                </div>
              </div>
              <div className="py-10">
                <div className="rounded overflow-hidden shadow-lg  max-w-sm">
                  <img
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&psig=AOvVaw1fNg9IVNosZgNNxE1lW-LP&ust=1680961822414000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNj9v_T0l_4CFQAAAAAdAAAAABAE"
                    alt="img"
                    className=""
                  />
                </div>
              </div>
              <div className="py-10">
                <div className="rounded overflow-hidden shadow-lg  max-w-sm">
                  <img
                    src="https://www.pexels.com/photo/black-nikon-dslr-camera-on-white-book-9222655/"
                    alt="img"
                    className=""
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div
            className={
              toggleState === 2
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full min-h-screen hidden"
            }
            id="content active-content"
          >
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-1 justify-items-center mt-10">
             
              <UploadedVideos />
            </div>
          </div>
          <div
            className={
              toggleState === 3
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full min-h-screen hidden"
            }
            id="content active-content"
          >
           <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-1 justify-items-center mt-10">
           <UploadedQuestions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploads;
