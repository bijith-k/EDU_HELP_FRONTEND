import React, { useEffect } from "react";
import Navbar from "../Dashboard/Navbar";
import UploadedNotes from "./UploadedNotes";
import UploadedQuestions from "./UploadedQuestions";
import { UploadedVideos } from "./UploadedVideos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import Footer from "../Footer/Footer";

const Uploads = () => {
  
  const navigate = useNavigate()
   
  const toast = useToast()

   


  const { tutor } = useSelector((state) => state.tutor);

  useEffect(() => {
    if (tutor.approved == false && tutor.rejected == false) {
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
