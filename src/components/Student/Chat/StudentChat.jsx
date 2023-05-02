import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Home/Navbar";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { io } from "socket.io-client";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";

// const ENDPOINT = "http://localhost:4000";
// var socket,selectedChatCompare;

const StudentChat = () => {
  const {student} = useSelector((state) => state.student);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  const token = localStorage.getItem("Stoken");

  // const [socketConnected, setSocketConnected] = useState(false)

  // useEffect(()=>{
  //   socket = io(ENDPOINT)
  //   socket.emit("setup",student)
  //   socket.on("connection",()=>{
  //       setSocketConnected(true)
  //   })
  // },[])
   
  useEffect(() => {
    socket.current = io("ws://localhost:4000");

    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", student._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [student]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance("Stoken").get(
          `get-conversation/${student._id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
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
        setMessages(res.data);
        // socket.emit("join chat",currentChat._id)
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
    //  selectedChatCompare = currentChat
  }, [currentChat]);

  // useEffect(()=>{
  //   socket.on("message received", (newMessage) => {
  //     console.log(newMessage);
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessage.sender
  //     ) {
  //       //give notification
  //     } else {
  //       setMessages({...messages,newMessage})
  //     }
  //   });
  // })

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
    socket.current.emit("sendMessage", {
      senderId: student._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axiosInstance("Stoken").post(`new-message`, message);
      // socket.emit('new message',res.data)
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"chats"} />
      <div className=" pb-16 flex w-full">
        <div className="w-3/12 ">
          <div className="chatMenuWrapper p-3  min-h-full">
            <input
              placeholder="Search tutors"
              className="w-full bg-transparent py-3 border-slate-900 border-b-2"
            />
            <p className="font-bold my-3 text-center text-lg">
              Recent conversations
            </p>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={student} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col justify-between" id="chatBoxWrapper">
            {currentChat ? (
              <>
                <div id="chatbox top" className="p-3 h-96 overflow-y-scroll">
                  {messages.map((message, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === student._id}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="mt-1 flex items-center justify-between"
                  id="chatboxbottom"
                >
                  <textarea
                    placeholder="Write something"
                    className="w-4/5 h-24 p-3"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="w-16 h-10 border-none rounded-md cursor-pointer bg-teal-800 text-white"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="">Open a conversation to chat a chat</span>
            )}
          </div>
        </div>
        <div className="w-3/12">
          <div className=" p-3  min-h-full">
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChat;
