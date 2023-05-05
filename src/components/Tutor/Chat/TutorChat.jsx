import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { io } from "socket.io-client";
import Navbar from "../Dashboard/Navbar";
import Message from "./Message";
import Conversation from "./Conversation";
import user from "../../../assets/user.png";
import Footer from "../Footer/Footer";


// const ENDPOINT = "http://localhost:4000";
// var socket,selectedChatCompare;

const TutorChat = () => {
  const {tutor} = useSelector((state) => state.tutor);
  
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [student, setStudent] = useState([])
 
  
  const socket = useRef();
  const scrollRef = useRef();

  const token = localStorage.getItem("Ttoken");
 
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

  

  // useEffect(() => {
  //   socket.current = io("ws://localhost:4000");

  //   socket.current.on("getMessage", (data) => {
  //     console.log(data,"tut")
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_BASE_PATH}`);
    socket.current.emit("add-user", tutor._id);
  }, [tutor]);

  

  // useEffect(() => {
  //   socket.current.emit("addUser", tutor._id);
  //   socket.current.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [tutor]);

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
    if(!newMessage){
      return
    }
    const message = {
      sender: tutor._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== tutor._id
    );
    // socket.current.emit("sendTutorMessage", {
    //   senderId: tutor._id,
    //   receiverId,
    //   text: newMessage,
    // });

    socket.current.emit("send-msg", {
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
    const studentId = currentChat?.members.find((m) => m !== tutor._id);
    console.log(studentId);
    if (studentId) {
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
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
       console.log("first")
      socket.current.on("msg-receive", (data) => {
       console.log(data,"dataa")
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-400 min-h-screen max-w-screen-2xl mx-auto w-full overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="bg-gray-600 uppercase border-b-2 border-white h-14 text-center text-white font-bold text-xl pt-3">
        CHATS
      </div>
      <div className="flex-grow md:h-96 flex flex-col md:flex-row">
        <div className=" flex flex-col bg-gray-400 overflow-y-auto scrollbar-track-transparent scrollbar-thin scrollbar-thumb-slate-200 ">
          <p className="font-bold border-b-2 p-3 text-center text-lg">
            Recent conversations
          </p>
          {conversations.map((c) => (
            <div className="" onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={tutor} />
            </div>
          ))}
        </div>

        <div className="flex-grow bg-slate-500">
          <div className="flex flex-col h-full  border-l-0 md:border-l-4 border-0">
            {currentChat ? (
              <>
                <div className="w-full h-16 bg-gray-700 flex flex-row items-center justify-start">
                  <div className="mx-4  border-white border-2 rounded-full">
                    <img
                      src={
                        student[0]?.profilePicture
                          ? `${import.meta.env.VITE_BASE_PATH}${
                              student[0].profilePicture
                            }`
                          : user
                      }
                      className="rounded-full w-10 h-10 "
                      alt="img"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-white">
                      {student[0]?.name}
                    </p>
                  </div>
                </div>
                <div
                  id="chatbox top"
                  className="p-3 h-96 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                >
                  {messages.map((message, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={message}
                        sendBy={
                          message.sender != tutor._id ? message.sender : null
                        }
                        own={message.sender === tutor._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1 w-full flex items-center justify-center">
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
              <span className="text-center font-bold text-xl my-20 text-white">
                Open a conversation to chat
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default TutorChat;
