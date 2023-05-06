import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import school from "../../../assets/school.png";
import newsImg from "../../../assets/news.png";


import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Skeleton, useToast } from "@chakra-ui/react";

const Home = () => {
  const toast = useToast()
  const { student } = useSelector((state) => state.student);
  const [event, setEvent] = useState([])
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false)
  function formatDate(dateString) {
    
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year.slice(-2)}`; // extract last two characters of year for yy format
    return formattedDate;
  }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-events`)
      .then((response) => {
        if(response.data.status==false){
          toast({
            title: response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem('Stoken')
          navigate('/signin')
        }else{
            setEvent(response.data[1]);
            setIsLoaded(true)
        }
        
      })
      .catch((err) => {
        console.log(err);
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
    <div className="h-screen max-w-screen-2xl bg-[#d4d8f0] pt-16 overflow-x-hidden mx-auto">
      <Header />
      {student.branch.name === "1-10" ? (
        <div className=" md:h-64 h-56 flex justify-center items-center my-1">
          <div className="md:h-60 h-48 bg-[#fffffe] w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR CLASS 1 TO 10 <br /> NOTES & VIDEOS
              </p>
              <button
                className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28"
                onClick={() => navigate("/notes")}
              >
                CLICK HERE
              </button>
            </div>
            <div className="flex items-center justify-center rou">
              <img
                src={school}
                alt=""
                className="object-cover md:max-w-xs p-5"
              />
            </div>
          </div>
        </div>
      ) : null}

      {student.branch.name === "11-12" ? (
        <div className=" md:h-64 h-56 flex justify-center items-center my-1">
          <div className="md:h-60 h-48 bg-[#fffffe] w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR CLASS 11 & 12 <br /> NOTES & VIDEOS
              </p>
              <button
                className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28"
                onClick={() => navigate("/notes")}
              >
                CLICK HERE
              </button>
            </div>
            <div className="flex items-center justify-center rou">
              <img
                src={school}
                alt=""
                className="object-cover md:max-w-xs p-5"
              />
            </div>
          </div>
        </div>
      ) : null}

      {student.board.name === "cu/mgu/ku" ? (
        <div className=" md:h-64 h-56 flex justify-center items-center my-1">
          <div className="md:h-60 h-48 bg-[#fffffe] w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR CU/MGU/KU <br /> NOTES & VIDEOS
              </p>
              <button
                className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28"
                onClick={() => navigate("/notes")}
              >
                CLICK HERE
              </button>
            </div>
            <div className="flex items-center justify-center rou">
              <img
                src={school}
                alt=""
                className="object-cover md:max-w-xs p-5"
              />
            </div>
          </div>
        </div>
      ) : null}

      {student.board.name === "ktu" ? (
        <div className=" md:h-64 h-56 flex justify-center items-center my-1 ">
          <div className="md:h-60 h-48 bg-[#fffffe] w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR KTU <br /> NOTES & VIDEOS
              </p>
              <button
                className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28"
                onClick={() => navigate("/notes")}
              >
                CLICK HERE
              </button>
            </div>
            <div className="flex items-center justify-center rou">
              <img
                src={school}
                alt=""
                className="object-cover md:max-w-xs p-5"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:h-80 h-80 bg-[#fffffe]  md:mx-8 mx-3 rounded-3xl grid-rows-3 grid ">
        <div className=" bg-[#fffffe] md:h-20 h-16 rounded-tl-3xl rounded-tr-3xl flex items-center justify-center row-span-1">
          <h1 className="uppercase text-[#232946] underline font-bold md:text-2xl">
            events happening across kerala
          </h1>
        </div>
        <div className="row-span-3 flex flex-row justify-center md:justify-evenly items-center mb-4">
          <div className="mx-3">
            <Skeleton isLoaded={isLoaded}>
              <img
                src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`}
                alt=""
                className="object-cover  w-44 h-44 rounded-xl"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:text-xl text-sm mr-0 md:mr-32">
              <Skeleton isLoaded={isLoaded}>
                <span className="uppercase font-bold">{event.name}</span> <br />
                <span>ORGANIZED BY : {event.organizer}</span> <br />
                <span>LOCATION : {event.location}</span> <br />
              </Skeleton>
            </div>
            <div className="md:text-xl text-sm">
              <Skeleton isLoaded={isLoaded}>
                {event.startingDate ? (
                  <>
                    <span>FROM : {formatDate(event.startingDate)}</span> <br />
                    <span>TO : {formatDate(event.endingDate)}</span> <br />
                  </>
                ) : null}
                <span>WEBSITE : {event.link}</span> <br />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className=" bg-[#232946] rounded-bl-3xl rounded-br-3xl flex items-center justify-center row-span-1">
          <h1
            className="uppercase text-[#fffffe] font-semibold md:text-lg p-2 cursor-pointer"
            onClick={() => navigate("/events")}
          >
            view more events
          </h1>
        </div>
      </div>

      <div className=" md:h-32 h-32 flex justify-center items-center my-5">
        <div className="md:h-32 h-32 bg-[#fffffe] w-full md:mx-8 mx-3 rounded-3xl ">
          <p className="text-center text-2xl font-bold mt-10">
            CHECK SOME TECH NEWS
          </p>

          <p
            className="text-center cursor-pointer font-semibold"
            onClick={() => navigate("/news")}
          >
            CLICK HERE
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
 