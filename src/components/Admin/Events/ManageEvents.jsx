import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

 
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
   

  
  const toast = useToast();

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/events`)
      .then((res) => {
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
          setEvents(res.data);
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
  }, [toastMessage]);

  

  function formatDate(dateString) {
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year.slice(-2)}`; // extract last two characters of year for yy format
    return formattedDate;
  }

   

  const handleApprove = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/approve-events?event=${id}`)
      .then((res) => {
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
          setToastMessage(`Clicked at ${new Date().toISOString()}`);
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
        
      })
      .catch((err) => {
        
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleReject = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/reject-events?event=${id}`)
      .then((res) => {
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
         setToastMessage(`Clicked at ${new Date().toISOString()}`);
         toast({
           title: res.data.message,
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "top",
         });
        }
        
      })
      .catch((err) => {
         
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .get(`admin/event-list-unlist?event=${id}`)
      .then((res) => {
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
          setToastMessage(`Clicked at ${new Date().toISOString()}`);
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
        
      })
      .catch((err) => {
         
        setToastMessage(`Clicked at ${new Date().toISOString()}`);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage events
        </p>
        

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th  className="p-3 border">
                  Name of event
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Organizer
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Location
                </Th>
                <Th
                  
                  className="p-3 border"
                  // width="20"
                >
                  Description
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Starting Date
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Ending Date
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Link
                </Th>
                <Th
                   
                  className="p-3 border"
                >
                  Contact
                </Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {events.map((event, index) => (
                <Tr key={index} className="bg-white uppercase">
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{event.name}</Td>
                  <Td className="border">{event.organizer}</Td>
                  <Td className="border">{event.location}</Td>
                  <Td className="border">{event.description}</Td>
                  <Td className="border">{formatDate(event.startingDate)}</Td>
                  <Td className="border">{formatDate(event.endingDate)}</Td>
                  <Td className="lowercase border">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-22 p-2 rounded-xl">
                      <a href={event.link} target="_blank">
                        Click
                      </a>
                    </button>
                  </Td>
                  <Td>{event.contact}</Td>
                  <Td className="border flex justify-start">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-28 p-2 rounded-xl">
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          event.poster
                        }`}
                        target="_blank"
                      >
                        VIEW POSTER
                      </a>
                    </button>
                    {event.approved ? (
                      <>
                        {event.listed ? (
                          <button
                            className="bg-gray-600 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(event._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-blue-400 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                            onClick={() => handleListUnlist(event._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : null}

                    {!event.approved && !event.rejected ? (
                      <button
                        className="bg-green-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleApprove(event._id)}
                      >
                        APPROVE
                      </button>
                    ) : null}

                    {!event.approved && !event.rejected ? (
                      <button
                        className="bg-red-500 font-semibold text-white m-2 w-22 p-2 rounded-xl"
                        onClick={() => handleReject(event._id)}
                      >
                        REJECT
                      </button>
                    ) : null}
 
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ManageEvents;
