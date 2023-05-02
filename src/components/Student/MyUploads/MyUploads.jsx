import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";
import MyNotes from "./MyNotes";
import MyVideos from "./MyVideos";
import MyQuestionPapers from "./MyQuestionPapers";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";

const MyUploads = () => {
  const [value, setValue] = React.useState("1");

  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"my uploads"} />

      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-slate-100 text-black">
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
    </div>
  );
};

export default MyUploads;
