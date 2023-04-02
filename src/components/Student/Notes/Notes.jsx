import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NotesContent from "./NotesContent";
import VideosContent from "./VideosContent";
import QuestionContent from "./QuestionContent";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";

const Notes = () => {
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
          const { data } = await axios.post(`${import.meta.env.VITE_BASE_PATH}`, { token });
          console.log(data,"data");
          if (data.status) {
            dispatch(
              setStudent({
                name: data.student.name,
                email: data.student.email,
                phone: data.student.phone,
                branch: data.student.branch,
                board: data.student.board,
                school: data.student.school,
                status: data.student.status,
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
    <div className="h-screen w-full bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
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
      <TabContext value={value} className="bg-black">
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

        {value === "1" && <NotesContent />}
        {value === "2" && <VideosContent />}
        {value === "3" && <QuestionContent />}
      </TabContext>
    </div>
  );
};

export default Notes;
