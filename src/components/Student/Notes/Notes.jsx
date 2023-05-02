import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
 
import NotesContent from "./NotesContent";
import VideosContent from "./VideosContent";
import QuestionContent from "./QuestionContent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";
import Header from "../Header/Header";

const Notes = () => {
  const [value, setValue] = React.useState("1");

  const {student} = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  

  return (
    <div className="min-h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <Header />
       
      <div className="bg-blue-500">
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

      {/* <TabContext value={value} className="bg-black">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="bg-blue-900 text-white grid"
              centered
            >
              <Tab
                label="NOTES"
                value="1"
                className="text-white font-semibold w-1/3"
              />
              <Tab
                label="VIDEOS"
                value="2"
                className="text-white font-semibold w-1/3"
              />
              <Tab
                label="QUESTION PAPERS"
                value="3"
                className="text-white font-semibold w-1/3"
              />
            </TabList>
          </Box>

          {/* {value === "1" && <NotesContent />}
          {value === "2" && <VideosContent />}
          {value === "3" && <QuestionContent />} */}
      {/* </TabContext> */}

      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-slate-100 text-black">
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
    </div>
  );
};

export default Notes;
