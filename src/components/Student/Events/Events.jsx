import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { ImLocation2 } from "react-icons/im";
import {FiPhoneCall} from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";


const Events = () => {
  const [value, setValue] = React.useState("1");

  const student = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("Stoken");
  const[events,setEvents] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function formatDate(dateString) {
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year.slice(-2)}`; // extract last two characters of year for yy format
    return formattedDate;
  }

  useEffect(() => {
    console.log(token, "tok");

    if (token) {
      const fetchStudentData = async () => {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_PATH}`,
            { token }
          );
          console.log(data, "data");
          if (data.status) {
            dispatch(
              setStudent({
                _id:data.student._id,
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
  }, []);

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_BASE_PATH}get-events`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("afasdfsdds");
      console.log(response.data, "events");
      setEvents(response.data);
    }).catch((err)=>{
      console.log('insd');
      console.log(err);
    })
  }, [])
  

  

  return (
    <div className="h-screen w-full bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            events
          </h1>
        
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center mt-5">
        {events.map((event,index)=>(
//  <div className="bg-gray-200 w-2/3 h-80 m-4 rounded-2xl ">
  // <div className="flex justify-end m-4">
  //   <ImLocation2 />
  // <p >{event.location}</p>

  // </div>
//   <div className=" flex flex-col justify-center items-center">
//   <img src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`} className="w-2/5 rounded-2xl" alt="" />
//  <p>{event.name}</p>
//  <div className="flex justify-center font-bold">
//   <BsFillCalendarWeekFill className="mr-4" />
//   <p className="mr-4"> {formatDate(event.startingDate)}</p>
//   <p className="mr-4">TO</p>
//  <p> {formatDate(event.endingDate)}</p>
//  </div> 
//  </div>
   
 
//        </div>

<div className="py-5 w-full p-10" key={index}>
<div className="rounded-xl bg-gray-200 hover:shadow-xl hover:shadow-gray-500 overflow-hidden shadow-lg h-full  p-2">
  <div className="flex justify-between">
  <div className="font-bold text-xl mb-2 uppercase">{event.name}</div>
  <div className="flex items-center">
    <ImLocation2 className="font-bold text-xl mb-2 mr-2 uppercase" />
  <p className="font-bold text-xl mb-2 uppercase" >{event.location}</p>

  </div>
  </div>
  <div className="w-64 h-64 bg-cover bg-black rounded-2xl  bg-center mx-auto  my-4">
      <img
        src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`}
        alt="img"
        className="h-full rounded-2xl object-contain"
      />
  </div>
  
  {/* <iframe
                title="PDF Viewer"
                src={`${import.meta.env.VITE_BASE_PATH}${event.poster}`}
                height="240"
                scrolling="no"
                
                className="w-full object-contain rounded-xl border border-yellow-600"
              /> */}
  <div className="px-6 py-4 flex flex-col items-center">
    <div className="font-semibold text-lg mb-2 uppercase">Organized by {event.organizer}</div>
    <p className="text-gray-500 font-semibold text-sm uppercase text-center my-1">
    {event.description}
    </p>
    <p className="text-gray-500 uppercase text-center my-1 font-semibold">
    scheduled from {formatDate(event.startingDate)} to {formatDate(event.endingDate)}
    </p>
    <p className="text-gray-500 text-sm font-semibold uppercase text-center my-1">
    <FiPhoneCall className="inline mr-2"/> {event.contact}
    </p>
    <span className="bg-gray-600 text-white  rounded-full px-3 p-3 text-sm font-base my-2 text-center">
        <a
                      href={event.link}
                      target="_blank"
                    >
                      Register now
                    </a>
        </span>
     
  </div>
  
</div>
</div>  
        
        ))}
       
         
      </div>
      
    </div>
  );
}

export default Events