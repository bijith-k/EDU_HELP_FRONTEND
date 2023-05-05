import React, { useEffect, useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

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
} from "@chakra-ui/react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const [data, setData] = useState("data hereeeeee");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/subjects`)
      .then((res) => {
        setSubjects(res.data.subjects);
      });
  }, []);

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...subjects].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSubjects(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...subjects].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSubjects(sorted);
      setOrder("ASC");
    }
  };

  const handleEdit = (subject) => {
    localStorage.setItem("subjectId", subject._id);
    localStorage.setItem("subBranchId", subject.branch._id);

    // dispatch(
    //   setBoardData({
    //     board,
    //   })
    // );
    navigate("/admin/edit-subject");
  };
  return (
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage subjects
        </p>
        <div className="flex justify-around">
          {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
  <input type="text" name="" id="" placeholder='search' className='inline-block' />
  <div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
    <FaSearch />
  </div>
</div> */}
          {/* <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
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
          </div> */}

          <div className="bg-green-600 p-2 rounded-2xl flex">
            <button
              className="font-bold text-white"
              onClick={() => navigate("/admin/add-subject")}
            >
              ADD SUBJECT
            </button>
          </div>
        </div>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14">
                <Th className="p-3 border">No</Th>
                <Th onClick={() => sorting("name")} className="p-3 border">
                  Name of Subject
                </Th>
                <Th
                  onClick={() => sorting("branch.name")}
                  className="p-3 border"
                >
                  Name of Branch
                </Th>
                <Th
                  onClick={() => sorting("column1")}
                  className="p-3 border text-center"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {subjects.map((subject, index) => (
                <Tr key={subject._id} className="uppercase bg-white">
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{subject.name}</Td>
                  <Td className="border">{subject.branch.name}</Td>
                  <Td className="border flex justify-center">
                    <button
                      onClick={() => handleEdit(subject)}
                      className="bg-yellow-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                    >
                      EDIT
                    </button>
                    {subject.listed ? (
                      <button
                        className="bg-gray-600 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(subject._id)}
                      >
                        UNLIST
                      </button>
                    ) : (
                      <button
                        className="bg-blue-400 font-semibold text-white m-2 w-20 p-2 rounded-xl"
                        onClick={() => handleListUnlist(subject._id)}
                      >
                        LIST
                      </button>
                    )}
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

export default SubjectList;
