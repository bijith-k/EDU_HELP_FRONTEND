import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "../../../axios";


import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,
  LinearScale,
  BarElement,
  Title, } from "chart.js";
import { Doughnut, Pie,Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
  LinearScale,
  BarElement,
  Title,);

 
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

 
const Dashboard = () => {

  const Token = localStorage.getItem('Adtoken')
  const [students, setStudents] = useState(0)
const [tutors, setTutors] = useState(0)

const [boards, setBoards] = useState([]);
const [count, setCount] = useState({
  note:0,
  videos:0,
  questions:0
})
const [notesCount, setNotesCount] = useState('')
const [videosCount, setVideosCount] = useState('')
const [questionsCount, setQuestionsCount] = useState("");

 

useEffect(() => {
  const fetchBoards = async () => {
    const res = await axios.get("admin/board-content-count", {
      headers: {
        authorization: `Bearer ${Token}`,
      },
    });
    setBoards(res.data);
  };
  fetchBoards();
}, []);

  useEffect(() => {
    axios
      .get(`admin/students`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStudents(res.data.length);
      });

      axios
        .get(`admin/tutors`, {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setTutors(res.data.length);
        });

        axios
          .get(`admin/notes`, {
            headers: {
              authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            
            setNotesCount(res.data.length);
            console.log(notesCount,"not");
          });

          
          axios
            .get(`admin/videos`, {
              headers: {
                authorization: `Bearer ${Token}`,
              },
            })
            .then((res) => {
             
              setVideosCount( res.data.length);
            console.log(videosCount,"vid");

            });


            axios
              .get(`admin/question-papers`, {
                headers: {
                  authorization: `Bearer ${Token}`,
                },
              })
              .then((res) => {
                 
               setQuestionsCount(res.data.length);
            console.log(questionsCount,"que");

              });
  }, []);


  


  const labels = [
    "January",
    "February",
    "March",
    
  ];


  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10,20,100],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };
  
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
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
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
              {/* <div className="font-semibold">pending approval : 10</div> */}
            </div>
            <div className="bg-dark-purple text-white w-72 h-28 md:w-72 md:h-32 rounded-xl p-5 my-3 text-center flex flex-col justify-center">
              <div className="text-xl font-bold">total tutors</div>
              <div className="font-semibold">{tutors} </div>
              {/* <div className="font-semibold">pending approval : 10</div> */}
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
                  {/* <div className="font-semibold">pending approval : 10</div> */}
                </div>
              );
            })}
          </div>
          {/* <div className="bg-white h-fit flex flex-col md:flex-row pb-10">
            <div className="w-72 h-72 mx-auto mt-5">
              <p className="font-bold text-lg text-center uppercase">
                Total available contents
              </p>
              <div className=" mx-auto">
                
                <Bar options={options} data={data} />
              </div>
            </div>
          </div> */}
          <div className="bg-white min-h-full flex flex-col md:flex-row pb-10">
            <div className="w-72 h-72 mx-auto mt-5">
              <p className="font-bold text-lg text-center uppercase">
                Total available contents
              </p>
              <div className="w-60 h-60 mx-auto">
                <Pie data={contentsCount} />
              </div>
            </div>
            {/* <div className="w-72 h-72 mx-auto mt-5">
              <p className="font-bold text-lg text-center uppercase">
                Total available contents
              </p>
              <div className="w-60 h-60 mx-auto">
                <Doughnut data={contentsCount} />
              </div>
            </div> */}

            {/* <div className="w-full md:w-1/3 h-1/3">
              <Pie data={contentsCount} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
