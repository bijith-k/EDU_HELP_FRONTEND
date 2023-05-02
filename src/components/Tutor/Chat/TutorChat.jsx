import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { io } from "socket.io-client";
import Navbar from "../Dashboard/Navbar";
import Message from "./Message";
import Conversation from "./Conversation";

// const ENDPOINT = "http://localhost:4000";
// var socket,selectedChatCompare;

const TutorChat = () => {
  const {tutor} = useSelector((state) => state.tutor);
  
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  console.log(conversations,"convo")
 console.log(messages,"messi");
 console.log(currentChat,"chat")
  const socket = useRef();
  const scrollRef = useRef();

  const token = localStorage.getItem("Ttoken");
 console.log(tutor);
  // const [socketConnected, setSocketConnected] = useState(false)

  // useEffect(()=>{
  //   socket = io(ENDPOINT)
  //   socket.emit("setup",tutor)
  //   socket.on("connection",()=>{
  //       setSocketConnected(true)
  //   })
  // },[])

  useEffect(() => {
    if (tutor.accepted == false && tutor.rejected == false) {
      navigate("/tutor/approval-pending");
    } else if (tutor.rejected) {
      navigate("/tutor/approval-rejected");
    } else if (tutor.blocked) {
      localStorage.removeItem("Ttoken");
      navigate("/tutor");
      toast({
        title: "Blocked",
        description: "Your account is blocked by the admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  

  useEffect(() => {
    socket.current = io("ws://localhost:4000");

    socket.current.on("getMessage", (data) => {
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
    socket.current.emit("addUser", tutor._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [tutor]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance("Ttoken").get(
          `tutor/get-conversation/${tutor._id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [tutor._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance("Ttoken").get(
          `tutor/get-message/${currentChat?._id}`
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
      sender: tutor._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== tutor._id
    );
    socket.current.emit("sendTutorMessage", {
      senderId: tutor._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axiosInstance("Ttoken").post(
        `tutor/new-message`,
        message
      );
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
    <div className="bg-gray-600 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-500 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        CHATS
      </div>
      <div className="bg-white h-screen pb-16 flex w-full">
        <div className="w-3/12 ">
          <div className="chatMenuWrapper p-3  min-h-full">
            {/* <input
              placeholder="Search tutors"
              className="w-full bg-transparent py-3 border-slate-900 border-b-2"
            /> */}
            <p className="font-bold border-b-2 text-center text-lg">Recent conversations</p>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={tutor} />
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
                        own={message.sender === tutor._id}
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
          {/* <div className=" p-3  min-h-full">
            <ChatOnlin />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TutorChat;
