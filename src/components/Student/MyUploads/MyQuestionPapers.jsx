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
} from "@chakra-ui/react";
import axios from "../../../axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyQuestionPapers = () => {
  const student = useSelector((state) => state.student);

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const[change,setChange] = useState('')


  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // const QuestionPapers = questions.filter(
  //   (question) => question.branch._id === student.branch._id
  // );

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

      console.log(questions,"qeeeeeeeeeeeeeeeeeeee");
  useEffect(() => {
    axios
      .get(`get-question-papers?id=${student._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Stoken")}`,
        },
      })
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "sfasdfsdf");
        setQuestions(response.data);
      });
  }, [change]);

  useEffect(() => {
    axios
      .get(
        `subjects?branch=${
          student.branch._id
        }`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("Stoken")}`,
          },
        }
      )
      .then((res) => {
        setSubjects(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handlePrivate = (id) =>{
    axios.put(
     `questions-private-public?id=${
       id
     }`,null,
     {
       headers: {
         authorization: `Bearer ${localStorage.getItem("Stoken")}`,
       },
     }
   ).then((res) => {
     console.log(res);
     // setToastMessage(res.data.message);
     toast.success(res.data.message, {
       position: "top-center",
     });
     setChange(res.data.message)
   })
   .catch((err) => {
     console.log(err);
     // setToastMessage(res.data.message);
     toast.error(err.message, {
       position: "top-center",
     });
   });
   }
  return (
    <div>
      {/* <div className="m-4 md:m-8 flex md:justify-evenly md:flex-row flex-col items-center ">
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Question Papers"
            className="bg-transparent placeholder-white font-semibold focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            className="bg-green-400 font-semibold rounded-full"
          >
            Search
          </Button>
        </div>
        <div>
           
          <FormControl className="w-56">
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="uppercase"
            >
              <MenuItem value={""}>All Subjects</MenuItem>
              {subjects.map((subject) => (
                <MenuItem
                  key={subject._id}
                  value={subject.name}
                  className="uppercase"
                >
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div> */}

      <div className="flex justify-center">
        <div className="grid md:grid-cols-4 gap-1">
          {filteredData.length > 0 ? (
            filteredData.map((question, index) => (
              //   <Card
              //     key={index}
              //     sx={{ maxWidth: 345 }}
              //     className="m-4 rounded-2xl shadow-xl bg-slate-200"
              //   >
              //     {/* <CardMedia
              //   sx={{ height: 240 }}
              //   image={school}
              //   title="green iguana"
              //   className="m-3 rounded-2xl border"
              // /> */}
              //     <CardMedia
              //       sx={{ height: 240 }}
              //       className="m-3 rounded-2xl border"
              //     >
              //       <iframe
              //         title="PDF Viewer"
              //         src={`${import.meta.env.VITE_BASE_PATH}${
              //           question.file_path
              //         }`}
              //         height="240"
              //         scrolling="no"
              //       />
              //     </CardMedia>
              //     <CardContent>
              //       <Typography gutterBottom variant="h6" component="div">
              //         {question.exam_name}
              //       </Typography>
              //       <Typography
              //         variant="body2"
              //         color="text.secondary"
              //         className="uppercase"
              //       >
              //         Class/Branch : {question.branch.name} <br />
              //         Subject : {question.subject.name}
              //       </Typography>
              //     </CardContent>
              //     <CardActions className="flex justify-center">
              //       <Button size="medium" className="bg-red-100 rounded-lg">
              //         <a
              //           href={`${import.meta.env.VITE_BASE_PATH}${
              //             question.file_path
              //           }`}
              //           target="_blank"
              //         >
              //           VIEW
              //         </a>
              //       </Button>
              //       {question.private ? (
              //         <Button
              //           size="medium"
              //           className="bg-rose-100 rounded-lg"
              //           onClick={() => handlePrivate(question._id)}
              //         >
              //           MAKE PUBLIC
              //         </Button>
              //       ) : (
              //         <Button
              //           size="medium"
              //           className="bg-rose-100 rounded-lg"
              //           onClick={() => handlePrivate(question._id)}
              //         >
              //           MAKE PRIVATE
              //         </Button>
              //       )}
              //     </CardActions>
              //     {/* <iframe src={`http://localhost:4000/${question.file_path}`} width="100%" height="500px"></iframe> */}
              //   </Card>

              <Card maxW="sm" key={index}>
                <CardBody>
                  {/* <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  /> */}
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
                    <Heading size="md"> {question.exam_name}</Heading>
                    <Text>
                      Class : {question.branch.name} <br />
                      Subject : {question.subject.name}
                    </Text>

                    {question.approved ? (
                      <Text>Status : Approved</Text>
                    ) : (
                      <Text>Status : Pending Admin approval</Text>
                    )}
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
                        VIEW
                      </a>
                    </Button>
                    {/* <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button> */}
                    {question.private ? (
                      <Button
                        // size="medium"
                        className="bg-red-100 p-3 rounded-lg"
                        onClick={() => handlePrivate(question._id)}
                      >
                        MAKE PUBLIC
                      </Button>
                    ) : (
                      <Button
                        // size="medium"
                        className="bg-red-100 p-3 rounded-lg"
                        onClick={() => handlePrivate(question._id)}
                      >
                        MAKE PRIVATE
                      </Button>
                    )}
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
      </div>
    </div>
  );
}

export default MyQuestionPapers