import React from "react";
import Navbar from "../Home/Navbar";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import MyNotes from "./MyNotes";
import MyVideos from "./MyVideos";
import MyQuestionPapers from "./MyQuestionPapers";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";

const MyUploads = () => {
   

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"my uploads"} />

      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-[#fffffe] text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MyNotes />
          </TabPanel>
          <TabPanel>
            <MyVideos />
          </TabPanel>
          <TabPanel>
            <MyQuestionPapers />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default MyUploads;
