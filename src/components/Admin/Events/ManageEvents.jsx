import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { FaSearch } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setEventsData, setNoteData } from "../../../features/contentSlice";

const StyledTableCell = styled(TableCell)({
  borderBottom: "none",
  fontWeight: "bold",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
});

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [order, setOrder] = useState("ASC");

  const dispatch = useDispatch();

  console.log(events, "nooo");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/events`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setEvents(res.data);
      });

    // axios.get(`${import.meta.env.VITE_BASE_PATH}admin/boards`).then((res)=>{
    //   console.log(res);
    //   setBoards(res.data.boards)
    // })

    // axios.get(`${import.meta.env.VITE_BASE_PATH}admin/branches`).then((res)=>{
    //   console.log(res,'3');
    //   setBranches(res.data.branches)
    // })
  }, [toastMessage]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...boards].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBoards(sorted);
      setOrder("ASC");
    }
  };

  const sortingBranch = (col) => {
    if (order === "ASC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...branches].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBranches(sorted);
      setOrder("ASC");
    }
  };

  const handleApprove = (id) => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_PATH}admin/approve-events?event=${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(res.data.message);
        toast.error(res.data.message, {
          position: "top-center",
        });
      });
  };

  const handleListUnlist = (id) => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_PATH}admin/event-list-unlist?event=${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(res.data.message);
        toast.error(res.data.message, {
          position: "top-center",
        });
      });
  };

  // const handleEdit = (event) => {
  //   console.log(event, "nouuutesjrlj");
  //   localStorage.setItem("eventId", event._id);
  //   dispatch(
  //     setEventsData({
  //       events: event,
  //     })
  //   );
  //   navigate("/admin-edit-events");
  // };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage events
        </p>
        <div className="flex justify-around">
          {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
          <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search"
              className="mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto"
            />
            <div className="bg-sky-900 p-3 text-white rounded-full  flex justify-center">
              <FaSearch />
            </div>
          </div>

          {/* <div className='bg-white p-2 rounded-2xl flex'>
        <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD NOTES</button>
      </div> */}
        </div>

        <StyledTableContainer
          component={Paper}
          className="rounded-2xl mt-3  border-4 border-white"
        >
          <Table className="min-w-2">
            <TableHead>
              <TableRow className="bg-green-300">
                <StyledTableCell className="">No</StyledTableCell>
                <StyledTableCell onClick={() => sorting("name")}>
                  Name of event
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Organizer
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Location
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Description
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Starting Date
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Ending Date
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Link
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Contact
                </StyledTableCell>
                <StyledTableCell className="text-center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index} className="bg-gray-300 uppercase">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.startingDate}</TableCell>
                  <TableCell>{event.endingDate}</TableCell>
                  <TableCell className="lowercase">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      <a href={event.link} target="_blank">
                        Click
                      </a>
                    </button>
                  </TableCell>
                  <TableCell>{event.contact}</TableCell>
                  <TableCell className="flex justify-center">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
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
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(event._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(event._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleApprove(event._id)}
                      >
                        APPROVE
                      </button>
                    )}

                    {/* <button
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                      onClick={() => handleEdit(event)}
                    >
                      EDIT
                    </button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    </div>
  );
};

export default ManageEvents;
