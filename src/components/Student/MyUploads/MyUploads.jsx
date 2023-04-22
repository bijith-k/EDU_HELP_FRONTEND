import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
 
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
 
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";
import MyNotes from "./MyNotes";
import MyVideos from "./MyVideos";
import MyQuestionPapers from "./MyQuestionPapers";


const MyUploads = () => {
  const [value, setValue] = React.useState("1");

  const student = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                token: data.token,
                profilePicture: data.student.profilePicture,
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
    <div className="h-screen w-full pt-16 bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
          MY UPLOADS
        </h1>
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

      {value === "1" && <MyNotes />}
      {value === "2" && <MyVideos />}
      {value === "3" && <MyQuestionPapers />}
    </TabContext> */}
      <Tabs variant="line" colorScheme="green">
        <TabList className="bg-slate-100 text-black">
          <Tab className="w-1/3">NOTES</Tab>
          <Tab className="w-1/3">VIDEOS</Tab>
          <Tab className="w-1/3">QUESTION PAPERS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><MyNotes /></TabPanel>
          <TabPanel><MyVideos /></TabPanel>
          <TabPanel>
            <MyQuestionPapers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
  
export default MyUploads