import React from 'react'
import user from "../../../assets/bij.jpg";

const ChatOnline = () => {
  return (
    <div id="chatonline">
      <div
        className="flex items-center font-medium cursor-pointer mt-3"
        id="chatonlinefriend"
      >
        <div className="relative mr-3" id="chatonlineimgcontain">
          <img
            src={user}
            alt="dp"
            className="w-10 h-10  border-2 border-white rounded-full object-cover"
          />
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-lime-600" id="chatonlinebadge"></div>
        </div>
        <span id="chatonlineusername">Jhon Doe</span>
      </div>
    </div>
  );
}

export default ChatOnline