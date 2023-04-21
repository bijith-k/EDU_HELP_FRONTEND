import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Home/Navbar';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import { useSelector } from 'react-redux';
import axios from "../../../axios";


const StudentChat = () => {

    const student = useSelector((state) => state.student);
     

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
     const scrollRef = useRef()

  const token = localStorage.getItem("Stoken");

    useEffect(() => {
      const getConversations = async () => {
        try {
          const res = await axios.get(`get-conversation/${student._id}`,{
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
          setConversations(res.data)
        } catch (error) {
          console.log(error);
        }
      };
      getConversations();
    }, [student._id]);
    

  useEffect(() => {
     const getMessages = async () =>{
      try {
        const res = await axios.get(`get-message/${currentChat?._id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data)
      } catch (error) {
          console.log(error);
      }
     }
     getMessages()
  }, [currentChat])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const message = {
      sender : student._id,
      text:newMessage,
      conversationId:currentChat._id
    }

    try {
      const res = await axios.post(`new-message`, message, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setMessages([...messages,res.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
     scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages])
  


  
 

   return (
     <div className="h-screen w-full bg-slate-300 overflow-x-hidden">
       <Navbar />
       <div className="bg-gray-400 h-72">
         <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
           "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
         </h1>
       </div>
       <div className="bg-blue-500">
         <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
           chats
         </h1>
       </div>
       <div className="min-h-screen pb-16 flex w-full">
         <div className="w-3/12 ">
           <div className="chatMenuWrapper p-3  min-h-full">
             <input
               placeholder="Search tutors"
               className="w-full bg-transparent py-3 border-slate-900 border-b-2"
             />
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
}

export default StudentChat