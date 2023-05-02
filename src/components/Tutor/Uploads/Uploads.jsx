import React, { useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import UploadedNotes from "./UploadedNotes";
import UploadedQuestions from "./UploadedQuestions";
import { UploadedVideos } from "./UploadedVideos";
import { setTutor } from "../../../features/tutorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";

const Uploads = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggleState, setToggleState] = useState(1);
  const toast = useToast()

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const { tutor } = useSelector((state) => state.tutor);

  useEffect(() => {
    if (tutor.accepted == false && tutor.rejected == false) {
      navigate("/tutor/approval-pending");
    } else if (tutor.rejected) {
      navigate("/tutor/approval-rejected");
    } else if (tutor.blocked) {
      localStorage.removeItem("Ttoken");
      navigate("/tutor");
      toast({
        title: "Blocked",
        description: "Your account is blocked by the admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);


  // useEffect(() => {
  //   const token = localStorage.getItem("Ttoken");
  //   console.log(token, "tok");

  //   if (token) {
  //     const fetchTutorData = async () => {
  //       try {
  //         const { data } = await axios.post(
  //           `tutor`,
  //           { token }
  //         );
  //         console.log(data, "data");
  //         if (data.status) {
  //           dispatch(
  //             setTutor({
  //               _id:data.tutor._id,
  //               name: data.tutor.name,
  //               email: data.tutor.email,
  //               phone: data.tutor.phone,
  //               subjects: data.tutor.subjects,
  //               timeFrom: data.tutor.timeFrom,
  //               timeTo: data.tutor.timeTo,
  //               profession: data.tutor.profession,
  //               status:data.tutor.status,
  //               token: data.token,
  //             })
  //           );
  //         } else {
  //           localStorage.removeItem("Ttoken");
  //           navigate("/tutor-signin");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchTutorData();
  //   } else {
  //     navigate("/tutor-signin");
  //   }
  // }, [dispatch]);

  return (
    <div className="bg-gray-600 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-500 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        your uploads
      </div>
      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-gray-300 text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels className="bg-slate-400">
          <TabPanel>
            <UploadedNotes />
          </TabPanel>
          <TabPanel>
            <UploadedVideos />
          </TabPanel>
          <TabPanel>
            <UploadedQuestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <div
        className="flex flex-col  w-full h-80  break-words "
        id="container"
      >
        <div className="flex" id="bloc-tabs">
          <div
            className={
              toggleState === 1
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs active-tabs"
            onClick={() => toggleTab(1)}
          >
            NOTES
          </div>
          <div
            className={
              toggleState === 2
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs"
            onClick={() => toggleTab(2)}
          >
            VIDEOS
          </div>
          <div
            className={
              toggleState === 3
                ? "p-4 text-center w-1/2 bg-slate-900 text-white cursor-pointer border-b-2  box-border relative outline-0"
                : "p-4 text-center w-1/2 bg-gray-300 cursor-pointer border-b-2 box-border relative outline-0"
            }
            id="tabs"
            onClick={() => toggleTab(3)}
          >
            QUESTION PAPERS
          </div>
        </div>

        <div className="flex-grow" id="content-tabs">
          <div
            className={
              toggleState === 1
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full h-screen hidden"
            }
            id="content active-content"
          >
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-1 justify-items-center mt-10">
             
                 <UploadedNotes />
               
            </div>
          </div>
          <div
            className={
              toggleState === 2
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full min-h-screen hidden"
            }
            id="content active-content"
          >
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-1 justify-items-center mt-10">
             
              <UploadedVideos />
            </div>
          </div>
          <div
            className={
              toggleState === 3
                ? "bg-slate-400 p-5 w-full min-h-screen block"
                : "bg-slate-400 p-5 w-full min-h-screen hidden"
            }
            id="content active-content"
          >
           <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-1 justify-items-center mt-10">
           <UploadedQuestions />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Uploads;
