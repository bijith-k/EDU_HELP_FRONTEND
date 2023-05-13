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

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
 
  const toast = useToast()
  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {
    axiosInstance("Adtoken")
      .get(`admin/subjects`)
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
          setSubjects(res.data.subjects);
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

   

  const handleEdit = (subject) => {
    localStorage.setItem("subjectId", subject._id);
    localStorage.setItem("subBranchId", subject.branch._id);

   
    navigate("/admin/edit-subject");
  };

  const handleListUnlist = (id) => {
    axiosInstance("Adtoken")
      .put(`admin/subject-list-unlist?id=${id}`)
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
      <div className="w-full overflow-clip">
        <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage subjects
        </p>
        <div className="flex justify-around">
          

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
                <Th   className="p-3 border">
                  Name of Subject
                </Th>
                <Th
                  
                  className="p-3 border"
                >
                  Name of Branch
                </Th>
                <Th
                   
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
