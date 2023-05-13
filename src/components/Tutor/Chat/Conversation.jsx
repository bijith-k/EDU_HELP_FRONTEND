import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import user from "../../../assets/user.png";

const Conversation = ({ conversation, currentUser }) => {
  const [student, setStudent] = useState([]);
 const [selected, setSelected] = useState(null)
const navigate = useNavigate();
const toast = useToast();
  
   
  useEffect(() => {
    const studentId = conversation.members.find((m) => m !== currentUser._id);
 
    const getStudents = async () => {
      try {
        const res = await axiosInstance("Ttoken").get(
          `tutor/get-students?id=${studentId}`
        );
        if (res.data.status == false) {
           
          localStorage.removeItem("Ttoken");
          navigate("/tutor");
        } else {
          setStudent(res.data);
        }
        
      } catch (error) {
        
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };
    getStudents();
  }, [currentUser, conversation]);

 n
  return (
    <>
      {student.map((student, index) => (
        <div
          key={index}
          
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-200  mt-5`}
          
        >
          <img
            src={
              student.profilePicture
                ? `${import.meta.env.VITE_BASE_PATH}${student.profilePicture}`
                : user
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
