import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
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
import { setNoteData } from "../../../features/contentSlice";

const StyledTableCell = styled(TableCell)({
  borderBottom: "none",
  fontWeight: "bold",
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: "auto",
});

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);

  const [boards, setBoards] = useState([]);
  const [branches, setBranches] = useState([]);

  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [order, setOrder] = useState("ASC");

  const dispatch = useDispatch();

  console.log(notes, "nooo");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_PATH}admin/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data);
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
      .get(`${import.meta.env.VITE_BASE_PATH}admin/approve-notes?note=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      })
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
        `${import.meta.env.VITE_BASE_PATH}admin/note-list-unlist?note=${id}`,
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

  // const handleEdit = (note) => {
  //   console.log(note, "nouuutesjrlj");
  //   localStorage.setItem("noteId", note._id);
  //   dispatch(
  //     setNoteData({
  //       note: note,
  //     })
  //   );
  //   navigate("/admin-edit-notes");
  // };
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>

      <div className="w-full  overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage notes
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
                  Name of Note
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of subject
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of Branch
                </StyledTableCell>
                <StyledTableCell onClick={() => sortingBranch("name")}>
                  Name of Board
                </StyledTableCell>
                <StyledTableCell className="text-center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={index} className="bg-gray-300 uppercase">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{note.note_name}</TableCell>
                  <TableCell>{note.subject.name}</TableCell>
                  <TableCell>{note.branch.name}</TableCell>
                  <TableCell>{note.board.name}</TableCell>
                  <TableCell className="flex justify-center">
                    <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      {" "}
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          note.file_path
                        }`}
                        target="_blank"
                      >
                        VIEW
                      </a>{" "}
                    </button>
                    {note.approved ? (
                      <>
                        {note.listed ? (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleApprove(note._id)}
                      >
                        APPROVE
                      </button>
                    )}

                    {/* <button
                      className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                      onClick={() => handleEdit(note)}
                    >
                      EDIT
                    </button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <div className='p-1 mt-2 bg-white w-full h-fit rounded-lg overflow-x-auto'>
<table className='table-auto h-fit w-full border-2  border-white'>
        <thead>
          <tr className='bg-green-300 h-14 uppercase'>
             <th className='p-3 border'>No</th>
             <th className='p-3 border'>Name of Note</th>
             <th className='p-3 border'>Name of subject</th>
             <th className='p-3 border'>Name of Branch</th>
             <th className='p-3 border'>Name of Board</th>
             <th className='p-3 border'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
        {notes.map((note, index) => (
          <tr className='bg-gray-300 h-16' key={index}>
            <td className='border'>{index + 1}</td>
            <td className='border'>{note.note_name}</td>
            <td className='border'>{note.subject.name}</td>
            <td className='border'>{note.branch.name}</td>
            <td className='border'>{note.board.name}</td>
            <td className='border flex justify-center'>
            <button className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl">
                      {" "}
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          note.file_path
                        }`}
                        target="_blank"
                      >
                        VIEW
                      </a>{" "}
                    </button>
                    {note.approved ? (
                      <>
                        {note.listed ? (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            UNLIST
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                            onClick={() => handleListUnlist(note._id)}
                          >
                            LIST
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleApprove(note._id)}
                      >
                        APPROVE
                      </button>
                    )}
            </td>
          </tr>
            ))}
        </tbody>
       </table>
  </div>
      
      </div>
    </div>
  );
};

export default ManageNotes;
