import React, { useEffect, useState } from 'react'
import user from "../../../assets/bij.jpg";
import axiosInstance from "../../../axios";



const Conversation = ({conversation,currentUser}) => {
  const [tutor, setTutor] = useState([])
  const token = localStorage.getItem("Stoken");

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
     const tutorId = conversation.members.find((m) => m !== currentUser._id);

     const getTutors = async () =>{
      try {
        const res = await axiosInstance("Stoken").get(
          `get-tutors?id=${tutorId}`
        );
        setTutor(res.data)
      } catch (error) {
        console.log(error);
      }
     }
     getTutors();
  }, [currentUser,conversation])
  
  return (
    <>
      {tutor.map((tutor, index) => (
        <div key={index}  className="flex items-center p-3 cursor-pointer hover:bg-gray-400 mt-5">
          <img
            src={tutor.pic ? tutor.pic : PF+"user.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover mr-5"
          />
          <span className="font-medium">{tutor.name}</span>
        </div>
      ))}
    </>
  );
}

export default Conversation