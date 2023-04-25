
import React, { useEffect, useState } from "react";

import axios from "../../../axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
} from "@chakra-ui/react";

const MyVideos = () => {
  const student = useSelector((state) => state.student);

  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);
  console.log(videos, "vid");
  const[change,setChange] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // const video = videos.filter(
  //   (video) => video.branch._id === student.branch._id
  // );
  // console.log(video, "vidooooo");
  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? videos.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.video_name
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
      : videos;

  useEffect(() => {
    axios
      .get(`get-videos?id=${student._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Stoken")}`,
        },
      })
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "sfasdfsdf");
        setVideos(response.data);
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
     `videos-private-public?id=${
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

   const handleDelete = (id) => {
    onClose();
     axios
       .delete(`delete-videos?id=${id}`, {
         headers: {
           authorization: `Bearer ${localStorage.getItem("Stoken")}`,
         },
       })
       .then((res) => {
         console.log(res);
         // setToastMessage(res.data.message);
         toast.success(res.data.message, {
           position: "top-center",
         });
         setChange(res.data.message);
       })
       .catch((err) => {
         console.log(err);
         // setToastMessage(res.data.message);
         toast.error(err.message, {
           position: "top-center",
         });
       });
   };
  return (
    <div>
      {/* <div className="m-4 md:m-8 flex md:justify-evenly md:flex-row flex-col items-center ">
        <div className="bg-gray-400 w-max p-3 rounded-full md:mb-0 mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Videos"
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
            filteredData.map((video, index) => (
              // <Card
              //   key={index}
              //   sx={{ maxWidth: 345 }}
              //   className="m-4 rounded-2xl shadow-xl bg-slate-200"
              // >
              //   <CardMedia
              //     sx={{ height: 240 }}
              //     className=" rounded-2xl border-4"
              //     component="iframe"
              //     title="test"
              //     src={video.video_link}
              //     allowFullScreen
              //   />

              //   <CardContent >
              //     <Typography gutterBottom variant="h6" component="div">
              //       {video.video_name}
              //     </Typography>
              //     <Typography
              //       variant="body2"
              //       color="text.secondary"
              //       className="uppercase"
              //     >
              //       Class/Branch : {video.branch.name} <br />
              //       Subject : {video.subject.name}
              //     </Typography>
              //     {video.approved ?
              //     (<Typography variant="body2" color="text.secondary">
              //    Status : Approved
              //   </Typography>) :
              //   ((<Typography variant="body2" color="text.secondary">
              //   Status : Pending Admin approval
              //  </Typography>) ) }
              //   </CardContent>
              //   <CardActions className="flex justify-center">
              //     {/* <Button size="medium" className="bg-red-100 rounded-lg"><a href={`${question.file_path}`} target='_blank'>
              //   DOWNLOAD</a>
              // </Button> */}
              //     {video.private ?
              //     (<Button size="medium" className="bg-rose-100 rounded-lg" onClick={()=>handlePrivate(video._id)}>
              //     MAKE PUBLIC
              //   </Button>) :
              //   (<Button size="medium" className="bg-rose-100 rounded-lg" onClick={()=>handlePrivate(video._id)}>
              //   MAKE PRIVATE
              // </Button>)}
              //   </CardActions>
              //   {/* <iframe src={`http://localhost:4000/${question.file_path}`} width="100%" height="500px"></iframe> */}
              // </Card>
              <Card maxW="sm" key={index}>
                <CardBody>
                  {/* <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  /> */}
                  <iframe
                    title="PDF Viewer"
                    src={video.video_link}
                    height="240"
                    scrolling="no"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md"> {video.video_name}</Heading>
                    <Text>
                      Class : {video.branch.name} <br />
                      Subject : {video.subject.name}
                    </Text>

                    {video.approved ? (
                      <Text>Status : Approved</Text>
                    ) : (
                      <Text>Status : Pending Admin approval</Text>
                    )}
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2" className="mx-auto">
                    {/* <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button> */}
                    {/* <Button className="bg-red-100 p-3 rounded-lg">
                      <a
                        href={`${import.meta.env.VITE_BASE_PATH}${
                          note.file_path
                        }`}
                        target="_blank"
                      >
                        VIEW
                      </a>
                    </Button> */}
                    {/* <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button> */}
                    {video.private ? (
                      <Button
                        // size="medium"
                        className="bg-red-100 p-3 rounded-lg"
                        onClick={() => handlePrivate(video._id)}
                      >
                        MAKE PUBLIC
                      </Button>
                    ) : (
                      <Button
                        // size="medium"
                        className="bg-red-100 p-3 rounded-lg"
                        onClick={() => handlePrivate(video._id)}
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
                            Delete Video
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => handleDelete(video._id)}
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
      </div>
    </div>
  );
}

export default MyVideos