import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import user from "../../../assets/user.png";
import axiosInstance from "../../../axios";
import Pagination from "../../Pagination/Pagination";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import CountDown from "../CountdownNotice/CountDown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Box, Skeleton, SkeletonText, Spinner, Stack, useToast } from "@chakra-ui/react";

const Tutors = () => {
  const { student } = useSelector((state) => state.student);
  const navigate = useNavigate();
  const toast = useToast();
  const [tutors, setTutors] = useState([]);
   const [infoLoading, setInfoLoading] = useState(true);

   const [tutorLoading, setTutorLoading] = useState(true);

  const [isSubscribed, setIsSubscribed] = useState(null);
 
 

  const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage, settutorsPerPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const lastTutorIndex = currentPage * tutorsPerPage;
  const firstTutorIndex = lastTutorIndex - tutorsPerPage;

  const tutor = tutors.filter((tut) => tut.board._id === student.board._id);

  const filteredData =
    searchQuery.trim() !== ""
      ? tutor.filter((item) => {
          return (
            searchQuery.trim() === "" ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.branch.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.board.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      : tutor;

  let currentTutors;
  if (searchQuery != "") {
    currentTutors = filteredData;
  } else {
    currentTutors = tutor.slice(firstTutorIndex, lastTutorIndex);
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
      if (data.status == false) {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        
        localStorage.removeItem("Stoken");
        navigate("/signin");
      } else {

        setIsSubscribed(data.subscribed)
        setInfoLoading(false);
        setTutorLoading(true);
      }
    };
    checkSubscription();
  }, []);

  useEffect(() => {
    if (isSubscribed) {
      axiosInstance("Stoken")
        .get(`get-tutors`)
        .then((res) => {
          setTutors(res.data);
          
        setTutorLoading(false)
        }).catch((err)=>{
          
          setTutorLoading(false)
        })
    }else{
      setInfoLoading(false);
      setTutorLoading(false);
    }
  }, [isSubscribed]);

  const handleConversation = (id) => {
    const res = axiosInstance("Stoken").post("new-conversation", {
      senderId: student._id,
      receiverId: id,
    });
    navigate("/chats");
  };

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"tutors"} />
      {infoLoading ? (
        <Box
          padding="6"
          boxShadow="lg"
          bg="white"
          className="mt-5 mx-auto h-52 w-4/5 rounded-3xl flex items-center justify-center"
        >
          <Skeleton height="28" mt="3" width="28" />
          <div className="ml-5">
            <Skeleton height="2" width="2xl" mt="3" />
            <Skeleton height="2" width="2xl" mt="3" />
            <Skeleton height="2" width="2xl" mt="3" />
            <Skeleton height="2" width="2xl" mt="3" />
          </div>
          <Skeleton height="8" ml="5" width="20" />
        </Box>
      ) : (
        <div>
          {isSubscribed ? (
            <CountDown expiredAt={student.subscription.expiredAt} />
          ) : null}
          {isSubscribed && tutor.length > 0 ? (
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
              <div>
                {tutorLoading ? (
                  <div className="flex">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                      mx={"auto"}
                      my={"6"}
                    />
                  </div>
                ) : (
                  <div>
                    {tutor.length > 0 ? (
                      <div className="h-4/6">
                        {currentTutors.length > 0 ? (
                          currentTutors.map((tutor, index) => (
                            <div className="p-2 flex justify-center " key={index}>
                              <div className="bg-[#fffffe] hover:shadow-xl flex flex-col justify-evenly md:flex-row hover:opacity-90  text-[#232946]  w-3/4 rounded-xl mt-5 p-5 h-fit text-center">
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
                                  <div className="mb-4 font-bold">
                                    {tutor.name}
                                  </div>
                                  <div>Board: {tutor.board.name}</div>
                                  <div>Branch: {tutor.branch.name}</div>
                                  <div>
                                    Subject:{" "}
                                    {tutor.subjects.map((sub, index) => (
                                      <span key={index}>{sub},</span>
                                    ))}
                                  </div>
                                  <div>
                                    time available :{" "}
                                    {formatTime(tutor.timeFrom)} to{" "}
                                    {formatTime(tutor.timeTo)}
                                  </div>
                                </div>
                                <div
                                  className="flex flex-col justify-center"
                                  onClick={() => handleConversation(tutor._id)}
                                >
                                  <span>
                                    {" "}
                                    <p className="bg-[#d4939d] p-2 text-black rounded-3xl uppercase font-bold mt-5 w-full hover:bg-[#232946] hover:text-white cursor-pointer mx-auto">
                                      message
                                    </p>{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center font-semibold my-8">
                            No results found for "{searchQuery}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="h-52">
                        <p className="text-center font-bold text-2xl">
                          No tutors are there available
                        </p>{" "}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-52 flex flex-col items-center">
                <p className="text-center font-bold text-2xl mt-10">
                  You are not subscribed to access tutors
                </p>
                <button
                  className="bg-[#eebbc3] p-2 rounded-lg uppercase mt-4 font-bold"
                  onClick={() => navigate("/plans")}
                >
                  check plans
                </button>
              </div>
            )}
            {searchQuery != "" ? null : (
              <Pagination
                totalContents={tutor.length}
                contentsPerPage={tutorsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      )}

      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Tutors;
