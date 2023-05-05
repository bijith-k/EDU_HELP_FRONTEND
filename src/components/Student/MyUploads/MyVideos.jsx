import React, { useEffect, useState } from "react";

import axiosInstance from "../../../axios";
import { useSelector } from "react-redux";
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
import Pagination from "../../Pagination/Pagination";
import Search from "../Search/Search";

const MyVideos = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();
  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [change, setChange] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [videosPerPage, setVideosPerPage] = useState(4);
const lastVideoIndex = currentPage * videosPerPage;
const firstVideoIndex = lastVideoIndex - videosPerPage;

const handleSearchQuery = (data) => {
  setSearchQuery(data);
};

const handleSelectedSubject = (data) => {
  setSelectedSubject(data);
};


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

      let currentVideos;
      if (searchQuery != "" || selectedSubject != "") {
        currentVideos = filteredData;
      } else {
        currentVideos = filteredData.slice(firstVideoIndex, lastVideoIndex);
      }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-videos?id=${student._id}`)
      .then((response) => {
        setVideos(response.data);
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

  const handlePrivate = (id) => {
    axiosInstance("Stoken")
      .put(`videos-private-public?id=${id}`)
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
      .delete(`delete-videos?id=${id}`)
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
      {videos.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}

      <div className="flex justify-center">
        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentVideos.length > 0 ? (
              currentVideos.map((video, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody className="flex flex-col">
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
                      <Heading size="md" className="uppercase">
                        {" "}
                        {video.video_name}
                      </Heading>
                      <Text className="uppercase">
                        Class : {video.branch.name} <br />
                        Subject : {video.subject.name}
                      </Text>

                      {video.approved ? (
                        <Text>Status : Approved</Text>
                      ) : video.rejected ? (
                        <>
                          <Text>Status : Rejected</Text>
                          <Text>Reason : {video.rejection_reason}</Text>
                        </>
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
                              Are you sure? You can't undo this action
                              afterwards.
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
        ) : (
          <div className="h-40">
            <p className="text-center font-bold text-lg">
              You haven't uploaded any videos
            </p>
          </div>
        )}
      </div>
      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={videos.length}
          contentsPerPage={videosPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default MyVideos;
