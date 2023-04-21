import React from 'react'
import Navbar from '../Home/Navbar'
import user from "../../../assets/bij.jpg";


const Profile = () => {
  return (
    <div className="h-screen w-full bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-80">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          HAPPY LEARNING BIJITH
        </h1>
        <div className='bg-gradient-to-br bg-red-700 h-1/2 flex justify-center items-center '>
          <img src={user} alt="profile_pic" className='h-2/3 rounded-3xl ' />
        </div>
      </div>
       
    </div>
  )
}

export default Profile