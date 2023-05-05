import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { ImLocation2 } from "react-icons/im";
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../../../features/studentSlice";
import Header from "../Header/Header";
import HeadTitle from "../Header/HeadTitle";
import Footer from "../Footer/Footer";
import { useToast } from "@chakra-ui/react";

const Events = () => {
  const [value, setValue] = React.useState("1");
const toast = useToast()
  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("Stoken");
  const [events, setEvents] = useState([]);

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
    axiosInstance("Stoken")
      .get(`get-events`)
      .then((response) => {
        if (response.data.status == false) {
          toast({
            title: response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setEvents(response.data);
        }
        
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      <Navbar />
      <Header />
      <HeadTitle title={"events"} />
      <div>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center mt-5">
            {events.map((event, index) => (
              <div className="py-5 w-full p-10 " key={index}>
                <div className="rounded-xl bg-[#fffffe] hover:shadow-xl hover:shadow-gray-500 overflow-hidden shadow-lg h-full  p-2">
                  <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2 uppercase">
                      {event.name}
                    </div>
                    <div className="flex items-center">
                      <ImLocation2 className="font-bold text-xl mb-2 mr-2 uppercase" />
                      <p className="font-bold text-xl mb-2 uppercase">
                        {event.location}
                      </p>
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
                src={` ${event.poster}`}
                height="240"
                scrolling="no"
                
                className="w-full object-contain rounded-xl border border-yellow-600"
              /> */}
                  <div className="px-6 py-4 flex flex-col items-center">
                    <div className="font-semibold text-lg mb-2 uppercase">
                      Organized by {event.organizer}
                    </div>
                    <p className="text-gray-500 font-semibold text-sm uppercase text-center my-1">
                      {event.description}
                    </p>
                    <p className="text-gray-500 uppercase text-center my-1 font-semibold">
                      scheduled from {formatDate(event.startingDate)} to{" "}
                      {formatDate(event.endingDate)}
                    </p>
                    <p className="text-gray-500 text-sm font-semibold uppercase text-center my-1">
                      <FiPhoneCall className="inline mr-2" /> {event.contact}
                    </p>
                    <span className="bg-[#232946] text-[#b8c1ec]  rounded-full px-3 p-3 text-sm font-base my-2 text-center">
                      <a href={event.link} target="_blank">
                        Register now
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-40">
            <p className="text-center font-bold text-lg">There is no events to show</p>
          </div>
        )}
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Events;
