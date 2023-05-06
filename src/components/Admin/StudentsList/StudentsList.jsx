import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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

const StudentsList = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  

  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/students`)
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
         setStudents(res.data);
        }
        
      });
  }, [toastMessage]);

  const handleBlockUnblock = (id) => {
    axiosInstance("Adtoken")
      .put(`admin/block-unblock-student?student=${id}`)
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
    <div className="bg-sky-900 min-h-screen max-w-screen-2xl mx-auto flex overflow-x-hidden">
      <div className="bg-dark-purple">
        <Sidebar />
      </div>
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage students
        </p>

        <TableContainer className="rounded-2xl mt-3">
          <Table variant="simple">
            <Thead>
              <Tr className="bg-green-300 h-14 cursor-pointer ">
                <Th className="p-3 border">No</Th>
                <Th className="p-3 border" >
                  Name
                </Th>
                <Th className="p-3 border" >
                  Email
                </Th>
                <Th className="p-3 border" >
                  Phone
                </Th>
                <Th className="p-3 border" >
                  Board
                </Th>
                <Th className="p-3 border" >
                  Class/Branch
                </Th>
                <Th className="p-3 border" >
                  School/College
                </Th>
                <Th className="p-3 border">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
              {students.map((student, index) => (
                <Tr className="bg-white" key={index}>
                  <Td className="border">{index + 1}</Td>
                  <Td className="border uppercase">{student.name}</Td>
                  <Td className="border">{student.email}</Td>
                  <Td className="border">{student.phone}</Td>
                  <Td className="border">{student.board.name}</Td>
                  <Td className="border">{student.branch.name}</Td>
                  <Td className="border">{student.school}</Td>
                  <Td className="border flex justify-center">
                    {student.blocked ? (
                      <button
                        className="bg-green-500 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                        onClick={() => handleBlockUnblock(student._id)}
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        className="bg-red-700 font-semibold text-white m-2 w-24 p-2 rounded-xl"
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
};

export default StudentsList;
