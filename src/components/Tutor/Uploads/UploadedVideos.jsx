import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UploadedVideos = () => {
  const tutor = useSelector((state) => state.tutor);
  console.log(tutor, "tutor");

  const [questions, setQuestions] = useState([]);
  const [change, setChange] = useState("");
  console.log(questions, "qqq");

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");
    axios
      .get(`tutor/uploaded-videos?id=${Tid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Ttoken")}`,
        },
      })
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "vid");
        setQuestions(response.data);
      });
  }, []);

  return (
    <>
      {questions.map((note, index) => (
        <div className="py-5 max-w-xs" key={index}>
          <div className="rounded-xl bg-gray-200 hover:shadow-xl hover:shadow-gray-500 overflow-hidden shadow-lg  p-2">
            {/* <img
        src="https://www.pexels.com/photo/black-nikon-dslr-camera-on-white-book-9222655/"
        alt="img"
        className=""
      /> */}
            <iframe
              title="PDF Viewer"
              src={`${note.file_path}`}
              height="240"
              scrolling="no"
              className="rounded-xl border border-yellow-600"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 uppercase">
                {note.note_name}
              </div>
              <p className="text-gray-500 uppercase ">
                CLASS : {note.branch.name}
              </p>
              <p className="text-gray-500 uppercase">
                Subject : {note.subject.name}
              </p>
              {note.approved ? (
                <p className="text-gray-500 uppercase">Status : Approved</p>
              ) : (
                <p className="text-gray-500 uppercase">
                  Status : Pending Admin approval
                </p>
              )}
            </div>
            <div className="grid grid-flow-col gap-5 pb-2 px-6">
              <span className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
                <a
                  href={`${note.file_path}`}
                  target="_blank"
                >
                  VIEW
                </a>
              </span>
              {/* <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
          download
        </span> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
