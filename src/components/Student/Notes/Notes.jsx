import React from "react";
import Navbar from "../Home/Navbar";
 
import NotesContent from "./NotesContent";
import VideosContent from "./VideosContent";
import QuestionContent from "./QuestionContent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Notes = () => {
 
  const {student} = useSelector((state) => state.student);
   

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />

      <div className="bg-[#232946]">
        {student.branch.name === "1-10" && (
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            class 1 to 10
          </h1>
        )}
        {student.branch.name === "11-12" && (
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            class 11 & 12
          </h1>
        )}

        {student.board.name === "ktu" && (
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            KTU
          </h1>
        )}

        {student.board.name === "cu/mgu/ku" && (
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            cu/mgu/ku
          </h1>
        )}
      </div>

      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-[#fffffe] text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NotesContent />
          </TabPanel>
          <TabPanel>
            <VideosContent />
          </TabPanel>
          <TabPanel>
            <QuestionContent />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Notes;
