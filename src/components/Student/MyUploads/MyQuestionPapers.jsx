import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../../../axios";
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const MyQuestionPapers = () => {
 
  const toast = useToast();
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  
  const [change, setChange] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [questionsPerPage, setQuestionsPerPage] = useState(4);
const lastQuestionIndex = currentPage * questionsPerPage;
const firstQuestionIndex = lastQuestionIndex - questionsPerPage;

   

  const handleSearchQuery = (data) => {
    setSearchQuery(data);
  };

  const handleSelectedSubject = (data) => {
    setSelectedSubject(data);
  };

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? questions.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.exam_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.subject.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) &&
            (selectedSubject === "" ||
              selectedSubject.toLowerCase() === item.subject.name.toLowerCase())
          );
        })
      : questions;

      let currentQuestions;
      if (searchQuery != "" || selectedSubject != "") {
        currentQuestions = filteredData;
      } else {
        currentQuestions = filteredData.slice(firstQuestionIndex, lastQuestionIndex);
      }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-question-papers?id=${true}`)
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
          setQuestions(response.data);
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
  }, [change]);

  

  const handlePrivate = (id) => {
    axiosInstance("Stoken")
      .put(`questions-private-public?id=${id}`)
      .then((res) => {
        if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setChange(res.data.message);
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
  };

  const handleDelete = (id) => {
    onClose();
    axiosInstance("Stoken")
      .delete(`delete-questions?id=${id}`)
      .then((res) => {
         if (res.data.status == false) {
           toast({
             title: res.data.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
           localStorage.removeItem("Stoken");
           navigate("/signin");
         } else {
           toast({
             title: res.data.message,
             status: "success",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
           setChange(res.data.message);
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
  };

  return (
    <div>
      {questions.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}

      <div className="flex justify-center">
        {questions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody className="flex flex-col">
                    <iframe
                      title="PDF Viewer"
                      src={`${import.meta.env.VITE_BASE_PATH}${
                        question.file_path
                      }`}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" className="uppercase">
                        {" "}
                        {question.exam_name}
                      </Heading>
                      <Text className="uppercase">
                        Class : {question.branch.name} <br />
                        Subject : {question.subject.name}
                      </Text>

                      {question.approved ? (
                        <Text>Status : Approved</Text>
                      ) : question.rejected ? (
                        <>
                          <Text>Status : Rejected</Text>
                          <Text>Reason : {question.rejection_reason}</Text>
                        </>
                      ) : (
                        <Text>Status : Pending Admin approval</Text>
                      )}
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      
                      <Button className="bg-red-100 p-3 rounded-lg">
                        <a
                          href={`${import.meta.env.VITE_BASE_PATH}${
                            question.file_path
                          }`}
                          target="_blank"
                        >
                          VIEW
                        </a>
                      </Button>
                     
                      {question.private ? (
                        <Button
                           
                          className="bg-red-100 p-3 rounded-lg"
                          onClick={() => handlePrivate(question._id)}
                        >
                          MAKE PUBLIC
                        </Button>
                      ) : (
                        <Button
                           
                          className="bg-red-100 p-3 rounded-lg"
                          onClick={() => handlePrivate(question._id)}
                        >
                          MAKE PRIVATE
                        </Button>
                      )}

                      <Button
                        // size="medium"
                        className="bg-red-500 text-white p-3 rounded-lg"
                        onClick={onOpen}
                      >
                        DELETE
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Question Paper
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => handleDelete(question._id)}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>
                No results found for "{searchQuery}" and "{selectedSubject}"
              </p>
            )}
          </div>
        ) : (
          <div className="h-40">
            <p className="text-center font-bold text-lg">
              You haven't uploaded any question papers
            </p>
          </div>
        )}
      </div>
      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={questions.length}
          contentsPerPage={questionsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default MyQuestionPapers;
