import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import school from "../../../assets/school.png";
import ragam from "../../../assets/ragam.jpeg";
import news from "../../../assets/news.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "../../../features/studentSlice";
import axios from "../../../axios";

const Home = () => {
  const student = useSelector((state) => state.student);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // Fetch boards from server on component mount
  //   axios.get(`admin/boards`)
  //     .then(res => setBoards(res.data.boards))
  //     .catch(err => console.error(err));
  // }, []);

  // const board = boards.filter(board => board._id === student.board);
  // console.log(board[0].name,'bb');

  useEffect(() => {
    const token = localStorage.getItem("Stoken");
    console.log(token, "tok");

    if (token) {
      const fetchStudentData = async () => {
        try {
          const { data } = await axios.post(
            ``,
            { token }
          );
          console.log(data, "data");
          if (data.status) {
            dispatch(
              setStudent({
                _id: data.student._id,
                name: data.student.name,
                email: data.student.email,
                phone: data.student.phone,
                branch: data.student.branch,
                board: data.student.board,
                school: data.student.school,
                status: data.student.status,
                profilePicture: data.student.profilePicture,
                token: data.token,
              })
            );
          } else {
            localStorage.removeItem("Stoken");
            navigate("/signin");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchStudentData();
    } else {
      navigate("/signin");
    }
  }, [dispatch]);

  return (
    <div className="h-screen w-full bg-slate-300 pt-16 overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
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
        <div className="row-span-3 flex justify-center items-center mb-4">
          <div className="ml-4">
            <img src={ragam} alt="" className="object-cover  w-44 rounded-xl" />
          </div>
          <div className="md:ml-10 md:text-xl sm:text-base font-medium">
            <span>RAGAM 2023</span> <br />
            <span>ORGANIZED BY : NIT CALICUT</span> <br />
            <span>LOCATION : CALICUT</span> <br />
            <span>FROM : 20-03-2023</span> <br />
            <span>TO : 25-03-2023</span> <br />
            <span>WEBSITE : ragam.co.in</span> <br />
          </div>
        </div>
        <div className=" bg-blue-900 rounded-bl-3xl rounded-br-3xl flex items-center justify-center row-span-1">
          <h1 className="uppercase text-yellow-200 font-semibold md:text-2xl p-2">
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