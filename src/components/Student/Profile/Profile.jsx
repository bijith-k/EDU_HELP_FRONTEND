import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import user from "../../../assets/user.png";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import axiosInstance from "../../../axios";
import { Button, Skeleton, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Profile = () => {
  const toast = useToast();
  const { student } = useSelector((state) => state.student);
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);

  const [notesCount, setNotesCount] = useState("");
  const [videosCount, setVideosCount] = useState("");
  const [questionsCount, setQuestionsCount] = useState("");
  const [plan, setPlan] = useState({
    name: "",
    startDate: "",
    endDate: "",
    price: "",
    duration: "",
  });

  const navigate = useNavigate();

  function formatDate(dateString) {
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year.slice(-2)}`; // extract last two characters of year for yy format
    return formattedDate;
  }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-upload-counts`)
      .then((response) => {
        if (response.data.status == false) {
          toast({
            title: response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {

          setNotesCount(response.data.noteCounts);
          setVideosCount(response.data.videoCounts);
          setQuestionsCount(response.data.questionCounts);
          setIsLoaded(true)
        }
      })
      .catch((error) => {
        setIsLoaded(true)
        console.log(error);
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-subscribed-plan`)
      .then((res) => {
        setIsPlanLoaded(true);
        if (res.data.subscribed) {
          setPlan({
            name: res.data.plan.plan,
            startDate: res.data.plan.used_by[0].startedAt,
            endDate: res.data.plan.used_by[0].expiredAt,
            price: res.data.plan.price,
            duration: res.data.plan.duration,
          });
          
        } else if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        }
      })
      .catch((err) => {
        setIsPlanLoaded(true)
        
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <div className=" h-72">
        <h1 className="text-center font-extrabold text-[#232946] shadow-inner font-sans text-4xl md:pt-32 pt-20 uppercase">
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
                <Skeleton width={"10"} mx={"auto"} isLoaded={isLoaded}>
                  <p className="font-bold text-gray-700 text-xl">
                    {notesCount}
                  </p>
                </Skeleton>
                <p className="text-gray-400">NOTES UPLOADS</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <Skeleton width={"10"} mx={"auto"} isLoaded={isLoaded}>
                  <p className="font-bold text-gray-700 text-xl">
                    {videosCount}
                  </p>
                </Skeleton>{" "}
                <p className="text-gray-400">VIDEOS UPLOADS</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <Skeleton width={"10"} mx={"auto"} isLoaded={isLoaded}>
                  <p className="font-bold text-gray-700 text-xl">
                    {questionsCount}
                  </p>
                </Skeleton>{" "}
                <p className="text-gray-400">QUESTION PAPER UPLOADS</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
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
              <Skeleton isLoaded={isPlanLoaded}>
                {plan?.name ? (
                  <div className="text-white p-5 uppercase rounded bg-[#d4939d] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    <p className="text-center">subscribed to </p>
                    <p className="text-center">{plan.name} plan</p>
                    <p className="text-center">
                      {" "}
                      Subscribed on {formatDate(plan.startDate)}
                    </p>
                    <p className="text-center">
                      will expire on {formatDate(plan.endDate)}
                    </p>
                    <p className="text-center">
                      Price : <BiRupee className="inline" />
                      {plan.price}
                    </p>
                  </div>
                ) : (
                  <div className="text-white p-5 uppercase rounded bg-red-400 flex flex-col justify-center hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    <p className="text-center">
                      you are not subscribed to any plan
                    </p>
                    <Button
                      // colorScheme="linkedin"
                      className="mx-auto bg-[#eebbc3] text-[#232946] mt-3 uppercase"
                      onClick={() => navigate("/plans")}
                    >
                      Buy One
                    </Button>
                  </div>
                )}
              </Skeleton>
            </div>
          </div>{" "}
          <div className="mt-10 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700 uppercase">
              {student.name}
            </h1>{" "}
            <p className="mt-4 text-gray-500 uppercase">
              {student.board.name},{student.branch.name}
            </p>{" "}
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
