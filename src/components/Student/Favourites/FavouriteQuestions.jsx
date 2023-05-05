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
import { useSelector } from "react-redux";
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";

const FavouriteQuestions = () => {
  const { student } = useSelector((state) => state.student);

  const toast = useToast();

  const [favouriteQuestions, setFavouriteQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
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

  const questions = favouriteQuestions.filter(
    (questions) => questions.question.listed == true
  );

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? questions.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.question.exam_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedSubject === "" ||
              selectedSubject.toLowerCase() === item.subject.toLowerCase())
          );
        })
      : questions;

      let currentQuestions;
      if (searchQuery != "" || selectedSubject != "") {
        currentQuestions = filteredData;
      } else {
        currentQuestions = filteredData.slice(
          firstQuestionIndex,
          lastQuestionIndex
        );
      }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`favourite-questions?id=${student._id}`)
      .then((response) => {
        setFavouriteQuestions(response.data);
      });
  }, [change]);

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`subjects?branch=${student.branch._id}`)
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemove = (id) => {
    onClose();
    axiosInstance("Stoken")
      .put(`remove-favourite-questions/${id}`)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setChange(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message,
          status: "success",
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
          <div className="grid md:grid-cols-4 gap-1">
            {filteredData.length > 0 ? (
              filteredData.map((questions, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody>
                    <iframe
                      title="PDF Viewer"
                      src={`${import.meta.env.VITE_BASE_PATH}${
                        questions.question.file_path
                      }`}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" className="uppercase">
                        {" "}
                        {questions.question.exam_name}
                      </Heading>
                      <Text className="uppercase">
                        Class : {questions.branch} <br />
                        Subject : {questions.subject}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button className="bg-red-100 p-3 rounded-lg">
                        <a
                          href={`${import.meta.env.VITE_BASE_PATH}${
                            questions.question.file_path
                          }`}
                          target="_blank"
                        >
                          VIEW
                        </a>
                      </Button>

                      <Button
                        // size="medium"
                        className="bg-red-500 text-white p-3 rounded-lg"
                        onClick={onOpen}
                      >
                        REMOVE
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Remove from favourite
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
                                onClick={() => handleRemove(questions._id)}
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
              Nothing in favourite question papers
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

export default FavouriteQuestions;
