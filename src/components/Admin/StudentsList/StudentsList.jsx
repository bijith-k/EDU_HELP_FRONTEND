import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Sidebar from '../Dashboard/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from "../../../axios";
import { toast } from 'react-toastify'
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

const StudentsList = () => {
 const toast = useToast();

  const navigate = useNavigate()
  const Token = localStorage.getItem("Adtoken")
  const [students, setStudents] = useState([])
  const [toastMessage, setToastMessage] = useState("");
console.log(students);
  useEffect(() => {
    axios
      .get(`admin/students`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStudents(res.data);
      });
      
  }, [toastMessage]);

  const handleBlockUnblock = (id) => {
    axios
      .put(
        `admin/block-unblock-student?student=${id}`,null,
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(id);
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(id);
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
    <div className="bg-sky-900 flex overflow-x-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage students
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
        </div>
        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14 ">
                <Th className="p-3 border">No</Th>
                <Th className="p-3 border">Name</Th>
                <Th className="p-3 border">Email</Th>
                <Th className="p-3 border">Phone</Th>
                <Th className="p-3 border">Board</Th>
                <Th className="p-3 border">Class/Branch</Th>
                <Th className="p-3 border">School/College</Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {students.map((student, index) => (
                <Tr className="bg-white" key={index}>
                  <Td  className="border">{index + 1}</Td>
                  <Td className="border uppercase">{student.name}</Td>
                  <Td className="border">{student.email}</Td>
                  <Td className="border">{student.phone}</Td>
                  <Td className="border">{student.board.name}</Td>
                  <Td className="border">{student.branch.name}</Td>
                  <Td className="border">{student.school}</Td>
                  <Td className="border flex justify-center">
                    {student.blocked ? (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleBlockUnblock(student._id)}
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleBlockUnblock(student._id)}
                      >
                        BLOCK
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
}

export default StudentsList
