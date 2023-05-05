import React, { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import { format } from "timeago.js";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Message = ({ message, own, sendBy }) => {
  const [tutor, setTutor] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (sendBy) {
      const getTutor = async () => {
        try {
          const res = await axiosInstance("Stoken").get(
            `get-tutors?id=${sendBy}`
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
      getTutor();
    }
  }, []);
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : null}`}>
      <div className=" flex">
        <img
          src={
            tutor[0]?.profilePicture
              ? `${import.meta.env.VITE_BASE_PATH}${tutor[0].profilePicture}`
              : user
          }
          alt=""
          className={`w-8 h-8 rounded-full object-cover mr-3 ${
            own ? "hidden" : null
          }`}
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
