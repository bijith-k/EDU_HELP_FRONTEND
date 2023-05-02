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
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../../../axios";
import exclusive from "../../../assets/exclusive (1).png";
import { useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";
import Search from "../Search/Search";

const QuestionContent = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);

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

  const QuestionPapers = questions.filter(
    (question) => question.branch._id === student.branch._id
  );

  

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? QuestionPapers.filter((item) => {
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
      : QuestionPapers;


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
      .get(`get-question-papers?studentId=${student._id}`)
      .then((response) => {
        setQuestions(response.data);
      });
  }, []);

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

  const handleFavourite = (id) => {
    axiosInstance("Stoken")
      .get(`add-favourite-question/${id}`)
      .then((res) => {
        if (res.data.added) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (!res.data.added) {
          toast({
            title: res.data.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <div>
      {QuestionPapers.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}

      <div className="flex justify-center">
        {QuestionPapers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <Card
                  maxW="sm"
                  key={index}
                  className={`relative ${
                    question.exclusive ? "shadow-2xl  border-y-4" : null
                  } `}
                >
                  {question.exclusive ? (
                    <div class="absolute z-50 bottom-40 right-14 -mt-3 -mr-3  w-10 h-10">
                      <img src={exclusive} alt="" />
                    </div>
                  ) : null}
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
                      {/* <Text color="blue.600" fontSize="2xl">
                      $450
                    </Text> */}
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      {/* <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button> */}
                      <Button className="bg-red-100 p-3 rounded-lg">
                        <a
                          href={`${import.meta.env.VITE_BASE_PATH}${
                            question.file_path
                          }`}
                          target="_blank"
                        >
                          DOWNLOAD
                        </a>
                      </Button>
                      {/* <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button> */}
                      <Button
                        className="bg-rose-100 p-3 rounded-lg"
                        onClick={() => handleFavourite(question._id)}
                      >
                        ADD TO FAVOURITE
                      </Button>
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
          <div>
            {" "}
            <p className="text-center font-bold text-lg">
              No question papers are there to display
            </p>
          </div>
        )}
      </div>

      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={QuestionPapers.length}
          contentsPerPage={questionsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default QuestionContent;
