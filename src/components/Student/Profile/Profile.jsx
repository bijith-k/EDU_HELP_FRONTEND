import React from 'react'
import Navbar from '../Home/Navbar'
import user from "../../../assets/user.png";
import UpdateProfile from './UpdateProfile';
import { useSelector } from 'react-redux';



const Profile = () => {
  const student = useSelector((state) => state.student);
   
  return (
    <div className="h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20 uppercase">
          HAPPY LEARNING {student.name}
        </h1>
      </div>
      <div>
        <div className="p-8 bg-white shadow">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                <p className="text-gray-400">NOTES UPLOADS</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                <p className="text-gray-400">VIDEOS UPLOADS</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">89</p>{" "}
                <p className="text-gray-400">QUESTION PAPER UPLOADS</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "} */}
                <img
                  src={
                    student.profilePicture
                      ? `${import.meta.env.VITE_BASE_PATH}${
                          student.profilePicture
                        }`
                      : user
                  }
                  alt=""
                  className="h-48 w-48 rounded-full"
                />
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
              <div className="text-white p-5 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <p className="text-center">subscribed to </p>
                <p className="text-center">elite plan</p>
                <p className="text-center">will expire on 33-33-3333</p>
              </div>
            </div>
          </div>{" "}
          <div className="mt-10 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700 uppercase">
              {student.name}
              {/* <span className="font-light text-gray-500">27</span> */}
            </h1>{" "}
            {/* <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>{" "} */}
            <p className="mt-4 text-gray-500 uppercase">{student.board.name},{student.branch.name}</p>{" "}
            <p className="mt-2 text-gray-500 uppercase">{student.school}</p>{" "}
          </div>{" "}
          <div className="mt-5 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-bold lg:px-16">
              UPDATE PROFILE INFORMATIONS
            </p>

            <UpdateProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile