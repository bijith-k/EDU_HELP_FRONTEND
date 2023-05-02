import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import user from "../../../assets/user.png";
import axiosInstance from "../../../axios";
import Pagination from "../../Pagination/Pagination";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import CountDown from "../CountdownNotice/CountDown";
import { useSelector } from "react-redux";

const Tutors = () => {
  const { student } = useSelector((state) => state.student);

  const [tutors, setTutors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { token } = localStorage.getItem("Stoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage, settutorsPerPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const lastTutorIndex = currentPage * tutorsPerPage;
  const firstTutorIndex = lastTutorIndex - tutorsPerPage;

   const filteredData =
     searchQuery.trim() !== "" 
       ? tutors.filter((item) => {
           return (
             (searchQuery.trim() === "" ||
               item.name
                 .toLowerCase()
                 .includes(searchQuery.toLowerCase()) ||
               item.branch.name
                 .toLowerCase()
                 .includes(searchQuery.toLowerCase()) ||
               item.board.name
                 .toLowerCase()
                 .includes(searchQuery.toLowerCase()))
           );
         })
       : tutors;

   let currentTutors;
   if (searchQuery != "") {
     currentTutors = filteredData;
   } else {
     currentTutors = tutors.slice(firstTutorIndex, lastTutorIndex);
   }

  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    time = date.toLocaleTimeString("en-US", {
      hour12: true,
      second: undefined,
    });
    return time;
  }

  useEffect(() => {
    const checkSubscription = async () => {
      const { data } = await axiosInstance("Stoken").get(`plan-details`);

      setIsSubscribed(data.subscribed);
    };
    checkSubscription();
  }, []);

  useEffect(() => {
    if (isSubscribed) {
      axiosInstance("Stoken")
        .get(`get-tutors`)
        .then((res) => {
          setTutors(res.data);
        });
    }
  }, [isSubscribed]);

   
  return (
    <div className="min-h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"tutors"} />
      {isSubscribed ? (
        <CountDown expiredAt={student.subscription.expiredAt} />
      ) : null}
      {isSubscribed ? (
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4 mx-auto">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search tutors"
            className="bg-transparent placeholder-white font-semibold focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      ) : null}

      <div>
        {isSubscribed ? (
          <div className="h-4/6">
            {currentTutors.length > 0 ? (
              currentTutors.map((tutor, index) => (
                <div className="p-2 flex justify-center ">
                  <div className="bg-dark-purple hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-white  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
                    <div className=" w-fit flex flex-col mx-auto md:mx-0">
                      <img
                        src={
                          tutor.profilePicture
                            ? `${import.meta.env.VITE_BASE_PATH}${
                                tutor.profilePicture
                              }`
                            : user
                        }
                        className="w-40 h-40 object-cover rounded-bl-3xl rounded-tr-3xl shadow-sm shadow-white"
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
                      <div>
                        time available : {formatTime(tutor.timeFrom)} to{" "}
                        {formatTime(tutor.timeTo)}
                      </div>
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
              ))
            ) : (
              <p>No results found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <div>not subscribed</div>
        )}
        {searchQuery != "" ? null : (
          <Pagination
            totalContents={tutors.length}
            contentsPerPage={tutorsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Tutors;
