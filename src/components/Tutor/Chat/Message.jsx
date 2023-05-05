import React, { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import { format } from "timeago.js";
import axiosInstance from "../../../axios";

const Message = ({ message, own,sendBy }) => {
  const [student, setStudent] = useState([]);
 

  useEffect(() => {
     if(sendBy){
const getStudent = async () => {
  try {
    const res = await axiosInstance("Ttoken").get(
      `tutor/get-students?id=${sendBy}`
    );
    setStudent(res.data);
  } catch (error) {
    console.log(error);
  }
};
getStudent();
     }
    
  }, []);
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : null}`}>
      <div className=" flex">
        <img
          src={student[0]?.profilePicture ? `${import.meta.env.VITE_BASE_PATH}${student[0].profilePicture}` : user}
          alt=""
          className={`w-8 h-8 rounded-full object-cover mr-3 ${own ? 'hidden' : null}`} 
        />
        <p
          className={`p-3 rounded-3xl ${
            own ? "bg-blue-200 text-black" : "bg-blue-500 text-white"
          }  max-w-xs`}
        >
          {message.text}
        </p>
      </div>
      <div className="text-xs mt-3">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
