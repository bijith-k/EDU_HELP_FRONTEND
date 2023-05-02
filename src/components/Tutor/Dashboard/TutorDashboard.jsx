import React, { useEffect, useState } from "react";
import user from "../../../assets/user.png";

import SideBar from "./SideBarData";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { useToast } from "@chakra-ui/react";

const TutorDashboard = () => {
  const { tutor } = useSelector((state) => state.tutor);

  const navigate = useNavigate();
  const [notesCount, setNotesCount] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [videosCount, setVideosCount] = useState(0);
  const token = localStorage.getItem("Ttoken");
  const toast = useToast();

  useEffect(() => {
    if (tutor.accepted == false && tutor.rejected == false) {
      navigate("/tutor/approval-pending");
    } else if (tutor.rejected) {
      navigate("/tutor/approval-rejected");
    } else if (tutor.blocked) {
      localStorage.removeItem("Ttoken");
      navigate("/tutor");
      toast({
        title: "Blocked",
        description: "Your account is blocked by the admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");

    axiosInstance("Ttoken")
      .get(`tutor/uploaded-notes?id=${Tid}`)
      .then((response) => {
        setNotesCount(response.data.length);
      });

    axiosInstance("Ttoken")
      .get(`tutor/uploaded-questions?id=${Tid}`)
      .then((response) => {
        setQuestionsCount(response.data.length);
      });

    axiosInstance("Ttoken")
      .get(`tutor/uploaded-videos?id=${Tid}`)
      .then((response) => {
        setVideosCount(response.data.length);
      });
  }, []);

  return (
    <div className="bg-slate-400 min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <div className=" w-full">
        <div className="bg-gray-500 h-72 flex flex-col justify-center items-center text-center md:justify-center uppercase ">
          <span className="text-2xl font-bold text-white">
            It's the teacher that makes the difference, not the classroom
          </span>
          <span className="text-xl font-semibold border-b-2 mt-3">
            <span className="text-slate-100">happy</span> teaching{" "}
            <span className="text-slate-100">{tutor.name}</span>
          </span>
        </div>

        <div>
          <div className="p-8 bg-white shadow">
            {" "}
            <div className="grid grid-cols-1 ">
              <div className="relative">
                {" "}
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>{" "} */}

                  <img
                    src={
                      tutor.profilePicture
                        ? `${import.meta.env.VITE_BASE_PATH}${
                            tutor.profilePicture
                          }`
                        : user
                    }
                    alt=""
                    className="h-48 w-48 rounded-full"
                  />
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-28 text-center border-b pb-12 ">
              {" "}
              <h1 className="text-4xl font-medium text-gray-700">
                {tutor.name}
              </h1>{" "}
              {/* <p className="font-light text-gray-600 mt-3">
                Bucharest, Romania
              </p>{" "}
              <p className="mt-8 text-gray-500">
                Solution Manager - Creative Tim Officer
              </p>{" "}
              <p className="mt-2 text-gray-500">
                University of Computer Science
              </p>{" "} */}
              <button
                className="text-indigo-500 py-2 px-4  font-medium mt-4 uppercase"
                onClick={() => navigate("/tutor/edit-profile")}
              >
                {" "}
                click to update your profile informations
              </button>{" "}
            </div>{" "}
            <div className=" flex flex-col md:flex-row justify-center md:justify-around items-center pt-5 uppercase">
              <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
                <div className="text-xl font-bold">your notes</div>
                <div className="font-semibold">uploaded : {notesCount}</div>
                {/* <div className="font-semibold">pending approval : 10</div> */}
              </div>
              <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
                <div className="text-xl font-bold">your question papers</div>
                <div className="font-semibold">uploaded : {questionsCount}</div>
                {/* <div className="font-semibold">pending approval : 10</div> */}
              </div>
              <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
                <div className="text-xl font-bold">your videos</div>
                <div className="font-semibold">uploaded : {videosCount}</div>
                {/* <div className="font-semibold">pending approval : 10</div> */}
              </div>
              {/* <div className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
                <div className="text-xl font-bold">your events</div>
                <div className="font-semibold">uploaded : 10</div>
                <div className="font-semibold">pending approval : 10</div>
              </div> */}
            </div>
            <div className=" flex flex-col justify-center">
              <button
                className="text-indigo-500 py-2 px-4  font-medium mt-4 uppercase"
                onClick={() => navigate("/tutor/uploads")}
              >
                {" "}
                view your uploads
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
