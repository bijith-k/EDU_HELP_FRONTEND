import React, { useEffect, useState } from "react";
import user from "../../../assets/bij.jpg";
import axiosInstance from "../../../axios";

const Conversation = ({ conversation, currentUser }) => {
  const [student, setStudent] = useState([]);
 const [selected, setSelected] = useState(null)

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
   
  useEffect(() => {
    const studentId = conversation.members.find((m) => m !== currentUser._id);
 
    const getStudents = async () => {
      try {
        const res = await axiosInstance("Ttoken").get(
          `tutor/get-students?id=${studentId}`
        );
        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, [currentUser, conversation]);

 const handleOptionClick = (id) => {
  console.log("first")
   setSelected((prevState) => {
    console.log(prevState,"pp")
     if (prevState === id) {
      console.log(prevState,id,"pre")
       // If the clicked option is already selected, unselect it
       return null;
     } else {
       // Otherwise, select the clicked option
       return id;
     }
   });
 };
  return (
    <>
      {student.map((student, index) => (
        <div
          key={index}
          onClick={() => handleOptionClick(student._id)}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-200  mt-5`}
          // ${
          //   selected === student._id ? "bg-slate-200" : "bg-transparent"
          // }
        >
          <img
            src={
              student.profilePicture
                ? `${import.meta.env.VITE_BASE_PATH}${student.profilePicture}`
                : PF + "user.png"
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover mr-5"
          />
          <span className="font-medium">{student.name}</span>
        </div>
      ))}
    </>
  );
};

export default Conversation;
