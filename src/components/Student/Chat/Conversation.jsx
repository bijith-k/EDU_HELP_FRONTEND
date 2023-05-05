import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Conversation = ({ conversation, currentUser }) => {
  const [tutor, setTutor] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const tutorId = conversation.members.find((m) => m !== currentUser._id);

    const getTutors = async () => {
      try {
        const res = await axiosInstance("Stoken").get(
          `get-tutors?id=${tutorId}`
        );

        if (res.data.status == false) {
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setTutor(res.data);
        }
      } catch (error) {
        console.log(error);
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };
    getTutors();
  }, [currentUser, conversation]);

  return (
    <>
      {tutor.map((tutor, index) => (
        <div
          key={index}
          className="flex items-center p-3 cursor-pointer hover:bg-gray-400 mt-5"
        >
          <img
            src={
              tutor.profilePicture
                ? `${import.meta.env.VITE_BASE_PATH}${tutor.profilePicture}`
                : PF + "user.png"
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover mr-5"
          />
          <span className="font-medium">{tutor.name}</span>
        </div>
      ))}
    </>
  );
};

export default Conversation;
