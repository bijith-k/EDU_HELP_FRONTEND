import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import user from "../../../assets/bij.jpg";
import axios from "../../../axios";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  console.log(tutors, "tuto");
  const token = localStorage.getItem("Stoken");

  useEffect(() => {
    const checkSubscription = async () => {
      const { data } = await axios.get(`plan-details`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
        console.log(data,"daatttt");
      setIsSubscribed(data.subscribed)
    };
    checkSubscription()
  }, []);
  

  useEffect(() => {
    if(isSubscribed){
          axios
            .get(`get-tutors`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res);
              setTutors(res.data);
            });
    }
    
  }, [isSubscribed]);

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
          tutors
        </h1>
      </div>
      {isSubscribed ? (
        <>
          {tutors.map((tutor, index) => (
            <div className="p-2 flex justify-center ">
              <div className="bg-dark-purple hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-white  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
                <div className=" w-fit flex flex-col mx-auto md:mx-0">
                  <img
                    src={user}
                    className="w-40 rounded-bl-3xl rounded-tr-3xl shadow-sm shadow-white"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center md:items-start uppercase">
                  <div className="mb-4 font-bold">{tutor.name}</div>
                  <div>Board: {tutor.board.name}</div>
                  <div>Branch: {tutor.branch.name}</div>
                  <div>
                    Subject:{" "}
                    {tutor.subjects.map((sub, index) => (
                      <span key={index}>{sub},</span>
                    ))}
                  </div>
                  <div>time available : 8pm to 11 pm</div>
                </div>
                <div className="flex flex-col justify-center">
                  <span>
                    {" "}
                    <p className="bg-gray-200 p-2 text-black rounded-3xl uppercase font-bold mt-5 w-full hover:bg-slate-500 hover:text-white mx-auto">
                      message
                    </p>{" "}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>not subscribed</div>
      )}
    </div>
  );
};

export default Tutors;
