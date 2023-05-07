import React, { useEffect, useState } from "react";

import axiosInstance from "../../../axios";
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
import { useNavigate } from "react-router-dom";
import NotesSkeleton from "../../NotesSkeleton/NotesSkeleton";

const MyVideos = () => {
   
  const toast = useToast();
  const [videos, setVideos] = useState([]);
   const navigate = useNavigate()

  const [change, setChange] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [videosPerPage, setVideosPerPage] = useState(4);
const lastVideoIndex = currentPage * videosPerPage;
const firstVideoIndex = lastVideoIndex - videosPerPage;
  const [loading, setLoading] = useState(true);
const [deleteVideoId, setDeleteVideoId] = useState(null);


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
      .get(`get-videos?id=${true}`)
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
          setVideos(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
           setChange(new Date().toISOString());
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
           setChange(new Date().toISOString());
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
      {loading ? (
        <NotesSkeleton />
      ) : (
        <div className="flex justify-center">
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
              {currentVideos.length > 0 ? (
                currentVideos.map((video, index) => (
                  <Card maxW="sm" key={index}>
                    <CardBody className="flex flex-col">
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
                        {video.private ? (
                          <Button
                            className="bg-red-100 p-3 rounded-lg"
                            onClick={() => handlePrivate(video._id)}
                          >
                            MAKE PUBLIC
                          </Button>
                        ) : (
                          <Button
                            className="bg-red-100 p-3 rounded-lg"
                            onClick={() => handlePrivate(video._id)}
                          >
                            MAKE PRIVATE
                          </Button>
                        )}
                        <Button
                          className="bg-red-500 text-white p-3 rounded-lg"
                         
                          onClick={() => {
                            setDeleteVideoId(video._id);
                            onOpen();
                          }}
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
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
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
                                  onClick={() => handleDelete(deleteVideoId)}
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
      )}
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
