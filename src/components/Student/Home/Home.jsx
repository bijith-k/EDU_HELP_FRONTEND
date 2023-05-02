import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import school from "../../../assets/school.png";
import ragam from "../../../assets/ragam.jpeg";
import news from "../../../assets/news.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import axiosInstance from "../../../axios";
import Header from "../Header/Header";

const Home = () => {
  const { student } = useSelector((state) => state.student);
  const [event, setEvent] = useState([])

  
  const navigate = useNavigate();
console.log(event)
  function formatDate(dateString) {
    console.log(dateString)
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year.slice(-2)}`; // extract last two characters of year for yy format
    return formattedDate;
  }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-events`)
      .then((response) => {
        setEvent(response.data[1])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <div className="h-screen w-full bg-slate-300 pt-16 overflow-x-hidden">
      {/* <Navbar /> */}
      <Header />
      {student.branch.name === "1-10" ? (
        <div className=" md:h-64 h-56 flex justify-center items-center my-1">
          <div className="md:h-60 h-48 bg-slate-400 w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR CLASS 1 TO 10 <br /> NOTES & VIDEOS
              </p>
              <button className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28">
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
          <div className="md:h-60 h-48 bg-slate-400 w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
            <div className="text-black font-bold text-center flex flex-col items-center justify-center">
              <p className="md:text-4xl sm:text-xl">
                FOR CLASS 11 & 12 <br /> NOTES & VIDEOS
              </p>
              <button className="rounded-md bg-black text-white font-normal p-1 mt-2 md:h-11 md:w-28">
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
          <div className="md:h-60 h-48 bg-slate-400 w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
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
        <div className=" md:h-64 h-56 flex justify-center items-center my-1">
          <div className="md:h-60 h-48 bg-slate-400 w-full md:mx-8 mx-3 rounded-3xl grid-cols-2 grid ">
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

      {/* <div className=" md:h-72 h-56 flex justify-center items-center"> */}
      <div className="md:h-80 h-80 bg-slate-400  md:mx-8 mx-3 rounded-3xl grid-rows-3 grid ">
        <div className=" bg-blue-900 md:h-20 h-16 rounded-tl-3xl rounded-tr-3xl flex items-center justify-center row-span-1">
          <h1 className="uppercase text-white font-bold md:text-2xl">
            events happening across kerala
          </h1>
        </div>
        <div className="row-span-3 flex flex-row justify-center md:justify-evenly items-center mb-4">
          {/* <div className="ml-4">
            <img src={ragam} alt="" className="object-cover  w-44 rounded-xl" />
          </div>
          <div className="md:ml-10 md:text-xl sm:text-base font-medium">
            <span>RAGAM 2023</span> <br />
            <span>ORGANIZED BY : NIT CALICUT</span> <br />
            <span>LOCATION : CALICUT</span> <br />
            <span>FROM : 20-03-2023</span> <br />
            <span>TO : 25-03-2023</span> <br />
            <span>WEBSITE : ragam.co.in</span> <br />
          </div> */}
          <div className="mx-3">
            <img
              src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`}
              alt=""
              className="object-cover  w-44 h-44 rounded-xl"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:text-xl text-sm mr-0 md:mr-32">
              <span className="uppercase font-bold">{event.name}</span> <br />
              <span>ORGANIZED BY : {event.organizer}</span> <br />
              <span>LOCATION : {event.location}</span> <br />
            </div>
            <div className="md:text-xl text-sm">
              {
              event.startingDate ? (<>
               <span>FROM : {formatDate(event.startingDate)}</span> <br />
              <span>TO : {formatDate(event.endingDate)}</span> <br />
              </>) : null 
              }
            
              <span>WEBSITE : {event.link}</span> <br />
            </div>
          </div>
        </div>
        <div className=" bg-blue-900 rounded-bl-3xl rounded-br-3xl flex items-center justify-center row-span-1">
          <h1
            className="uppercase text-yellow-200 font-semibold md:text-2xl p-2 cursor-pointer"
            onClick={() => navigate("/events")}
          >
            view more events
          </h1>
        </div>
      </div>
      {/* </div> */}

      {/* <div className=" md:h-64 h-56 flex justify-center items-center"> */}
      <div className="md:h-64 h-64 bg-slate-400  md:mx-8 mx-3 rounded-3xl grid-rows-3 grid  mt-4 ">
        <div className=" bg-blue-900 rounded-tl-3xl rounded-tr-3xl flex items-center justify-center row-span-1">
          <h1 className="uppercase text-white font-bold md:text-2xl">
            educational news
          </h1>
        </div>
        <div className="row-span-3 flex justify-center items-center my-4">
          <div className="ml-4">
            <img
              src={news}
              alt=""
              className="object-cover  md:w-48 rounded-xl"
            />
          </div>
          <div className=" font-medium ml-2">
            <span>
              How management degrees in the IIT ecosystem differ from other MBA
              institutes, IIT Delhi professor explains
            </span>{" "}
            <br />
            <span className="text-blue-700">read more</span> <br />
          </div>
        </div>
        <div className=" bg-blue-900 rounded-bl-3xl rounded-br-3xl flex items-center justify-center row-span-1">
          <h1 className="uppercase text-yellow-200 font-semibold md:text-2xl p-2">
            view more news
          </h1>
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import React from 'react'

// const Home = () => {
//   return (
//     <Tabs>
//       <TabList className="bg-green-500">
//         <Tab className="bg-red-300 w-1/3">One</Tab>
//         <Tab className="bg-yellow-300 w-1/3">Two</Tab>
//         <Tab className="bg-blue-300 w-1/3">Three</Tab>
//       </TabList>

//       <TabPanels>
//         <TabPanel>
//           <p>one!</p>
//         </TabPanel>
//         <TabPanel>
//           <p>two!</p>
//         </TabPanel>
//         <TabPanel>
//           <p>three!</p>
//         </TabPanel>
//       </TabPanels>
//     </Tabs>
//   );
// }

// export default Home
