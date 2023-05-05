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
import Footer from "../Footer/Footer";

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
    <div className="bg-gray-400 min-h-screen max-w-screen-2xl mx-auto w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-600 uppercase h-14 text-center text-white font-bold text-xl pt-3">
        your uploads
      </div>
      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-gray-300 text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels className="bg-gray-400 min-h-screen">
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

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Uploads;
