import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Home/Navbar";
import Conversation from "./Conversation";
import Message from "./Message";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { io } from "socket.io-client";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import user from "../../../assets/user.png";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const StudentChat = () => {
  const { student } = useSelector((state) => state.student);
  const navigate = useNavigate();
  const toast = useToast();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [tutor, setTutor] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_BASE_PATH}`);
    socket.current.emit("add-user", student._id);
  }, [student]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance("Stoken").get(
          `get-conversation/${student._id}`
        );
        if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setConversations(res.data);
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
    getConversations();
  }, [student._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance("Stoken").get(
          `get-message/${currentChat?._id}`
        );
        if (res.data.status == false) {
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setMessages(res.data);
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
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: student._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== student._id
    );

    socket.current.emit("send-msg", {
      receiverId,
      senderId: student._id,
      text: newMessage,
    });

    try {
      const res = await axiosInstance("Stoken").post(`new-message`, message);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      const { data } = await axiosInstance("Stoken").get(`plan-details`);
      if (data.status == false) {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.removeItem("Stoken");
        navigate("/signin");
      } else {
        setIsSubscribed(data.subscribed);
      }
    };
    checkSubscription();
  }, []);

  useEffect(() => {
    const tutorId = currentChat?.members.find((m) => m !== student._id);

    const getTutors = async () => {
      try {
        if (tutorId) {
          const res = await axiosInstance("Stoken").get(
            `get-tutors?id=${tutorId}`
          );
          if (res.data.status == false) {
            localStorage.removeItem("Stoken");
            navigate("/signin");
          } else {
            setTutor(res.data);
          }
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
    getTutors();
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"chats"} />
      <div>
         {isSubscribed ? (
        <div className="flex-grow  md:h-96 flex flex-col md:flex-row">
          <div className="flex p-3 flex-col  bg-slate-300 overflow-y-auto scrollbar-track-transparent scrollbar-thin scrollbar-thumb-slate-700 ">
            <p className="font-bold p-3 border-b-2 text-center text-lg">
              Recent conversations
            </p>
            {conversations.map((c, index) => (
              <div onClick={() => setCurrentChat(c)} key={index}>
                <Conversation conversation={c} currentUser={student} />
              </div>
            ))}
          </div>

          <div className="flex-grow ">
            <div
              className="flex flex-col h-full  border-l-0 md:border-l-4 border-0"
              id="chatBoxWrapper"
            >
              {currentChat ? (
                <>
                  <div className="w-full h-16 bg-[#19376D] flex flex-row items-center justify-start">
                    <div className="mx-4  border-white border-2 rounded-full">
                      <img
                        src={
                          tutor[0]?.profilePicture
                            ? `${import.meta.env.VITE_BASE_PATH}${
                                tutor[0].profilePicture
                              }`
                            : user
                        }
                        className="rounded-full w-10 h-10 "
                        alt="img"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-white">
                        {tutor[0]?.name}
                      </p>
                    </div>
                  </div>
                  <div
                    id="chatbox top"
                    className="p-3 overflow-x-hidden h-96 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                  >
                    {messages.map((message, index) => (
                      <div key={index} ref={scrollRef}>
                        <Message
                          message={message}
                          sendBy={
                            message.sender != student._id
                              ? message.sender
                              : null
                          }
                          own={message.sender === student._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-1 w-full flex items-center justify-center"
                    id="chatboxbottom"
                  >
                    <textarea
                      placeholder="Write something"
                      className="w-10/12 h-12 p-3 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button
                      className="w-2/12 h-12 border-none cursor-pointer bg-teal-800 text-white"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="text-center font-bold text-xl my-20">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div>
        </div>
        ) : (
          <div className="h-52 flex flex-col items-center">
            <p className="text-center font-bold text-2xl mt-10">
              You are not subscribed to access chat
            </p>
            <button
              className="bg-[#eebbc3] p-2 rounded-lg uppercase mt-4 font-bold"
              onClick={() => navigate("/plans")}
            >
              check plans
            </button>
          </div>
        )}
      </div>
      <div className="mt-1">
        <Footer />
      </div>
    </div>
  );
};

export default StudentChat;
