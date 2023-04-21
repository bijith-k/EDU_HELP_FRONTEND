import React from 'react'
import user from "../../../assets/bij.jpg";
import {format} from 'timeago.js'


const Message = ({message,own}) => {
  return (
    <div  className={`flex flex-col mt-5 ${own ? 'items-end' : null}`}>
      <div className="messageTop flex">
        <img
          src={user}
          alt=""
          className="w-8 h-8 rounded-full object-cover mr-3"
        />
        <p className={`p-3 rounded-3xl ${own ? 'bg-blue-200 text-black' : 'bg-blue-500 text-white' }  max-w-xs`}>{message.text}</p>
      </div>
      <div className="text-xs mt-3">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message