import React, { useEffect, useState } from "react";
import user from "../../../assets/bij.jpg";
import axios from "../../../axios";

const Conversation = ({ conversation, currentUser }) => {
  const [student, setStudent] = useState([]);
  console.log(student);
  const token = localStorage.getItem("Ttoken");

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  console.log(conversation,"convorsationnnnnn")
  console.log(currentUser, "currr");
  useEffect(() => {
    const studentId = conversation.members.find((m) => m !== currentUser._id);
console.log(studentId,"studentid")
    const getTutors = async () => {
      try {
        const res = await axios.get(`tutor/get-students?id=${studentId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTutors();
  }, [currentUser, conversation]);

  return (
    <>
      {student.map((student, index) => (
        <div
          key={index}
          className="flex items-center p-3 cursor-pointer hover:bg-gray-400 mt-5"
        >
          <img
            src={student.pic ? student.pic : PF + "user.png"}
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
