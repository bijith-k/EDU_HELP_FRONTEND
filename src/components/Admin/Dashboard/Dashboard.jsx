import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "../../../axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

 

const Dashboard = () => {
 const toast = useToast()
 const navigate = useNavigate()
   
  
  const [students, setStudents] = useState(0);
  const [tutors, setTutors] = useState(0);

  const [boards, setBoards] = useState([]);
  const [count, setCount] = useState({
    note: 0,
    videos: 0,
    questions: 0,
  });
  const [notesCount, setNotesCount] = useState("");
  const [videosCount, setVideosCount] = useState("");
  const [questionsCount, setQuestionsCount] = useState("");

   const [planCount, setPlanCount] = useState([]);
   

  useEffect(() => {
    
    const fetchBoards = async () => {
      const res = await axiosInstance("Adtoken").get(
        "admin/board-content-count"
      );
      if (res.data.status == false) {
        toast({
          title: res.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.removeItem("Adtoken");
        navigate("/admin");
      } else {
        setBoards(res.data);
      }
      
    };
    fetchBoards();


  }, []);

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/students`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
          setStudents(res.data.length);
        }
      })
      .catch((err) => {
        
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });

    axiosInstance("Adtoken")
      .get(`admin/tutors`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
         setTutors(res.data.length);
        }
        
      })
      .catch((err) => {
       
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });

    axiosInstance("Adtoken")
      .get(`admin/notes`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
           setNotesCount(res.data.length);
        }
       
      })
      .catch((err) => {
         
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });

    axiosInstance("Adtoken")
      .get(`admin/videos`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
          setVideosCount(res.data.length);
        }
        
      })
      .catch((err) => {
        
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });

    axiosInstance("Adtoken")
      .get(`admin/question-papers`)
      .then((res) => {
        if (res.data.status == false) {
          localStorage.removeItem("Adtoken");
          navigate("/admin");
        } else {
         setQuestionsCount(res.data.length);
        }
       
      })
      .catch((err) => {
         
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });

      axiosInstance("Adtoken")
        .get(`admin/activePlans`)
        .then((res) => {
          if (res.data.status == false) {
            localStorage.removeItem("Adtoken");
            navigate("/admin");
          } else {
             setPlanCount(res.data.planCount);
          }
         
        })
        .catch((err) => {
          
          toast({
            title: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
  }, []);


   
 


   

  const contentsCount = {
    labels: ["Notes", "Videos", "Question Papers"],
    datasets: [
      {
        label: "Available",
        data: [notesCount, videosCount, questionsCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Dlabels = planCount?.map((data) => data._id);
  const Dcounts = planCount?.map((data) => data.count);

 const planCounts = {
   labels: Dlabels,
   datasets: [
     {
       data: Dcounts,
       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
     },
   ],
 };

 
  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          WELCOME ADMIN
        </p>
        <div className="">
          <div className=" flex flex-col md:flex-row justify-center md:justify-around items-center pt-5 uppercase">
            <div className="bg-dark-purple text-white w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
              <div className="text-xl font-bold">total students</div>
              <div className="font-semibold"> {students} </div>
              
            </div>
            <div className="bg-dark-purple text-white w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
              <div className="text-xl font-bold">total tutors</div>
              <div className="font-semibold">{tutors} </div>
              
            </div>
          </div>
          <div className=" flex flex-col md:flex-row justify-center md:justify-around items-center pt-5 uppercase">
            {boards.map((board, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center"
                >
                  <div className="text-xl font-bold mb-2">{board.name}</div>
                  <p className="font-semibold">
                    {" "}
                    Total Notes : {board.noteCount}{" "}
                  </p>
                  <p className="font-semibold">
                    {" "}
                    Total videos : {board.videoCount}{" "}
                  </p>
                  <p className="font-semibold">
                    {" "}
                    Total question papers : {board.questionPaperCount}{" "}
                  </p>
                   
                </div>
              );
            })}
          </div>

          <div className="bg-white min-h-full flex flex-col md:flex-row pb-10">
            <div className="w-72 h-72 mx-auto mt-5">
              <p className="font-bold text-lg text-center uppercase">
                Total available contents
              </p>
              <div className="w-60 h-60 mx-auto">
                <Pie data={contentsCount} />
              </div>
            </div>
            <div className="w-72 h-72 mx-auto mt-5">
              <p className="font-bold text-lg text-center uppercase">
                Total Subscription
              </p>
              <div className="w-60 h-60 mx-auto">
                <Doughnut data={planCounts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
