import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axiosInstance from "../../../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";

export const UploadedVideos = () => {
  const { tutor } = useSelector((state) => state.tutor);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [videos, setVideos] = useState([]);
  const [change, setChange] = useState("");
  const toast = useToast();

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


  const token = localStorage.getItem("Ttoken");

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");
    axiosInstance("Ttoken")
      .get(`tutor/uploaded-videos?id=${Tid}`)
      .then((response) => {
        setVideos(response.data);
      });
  }, [change]);

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? videos.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.video_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subject.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
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

  const handlePrivate = (id) => {
    axiosInstance("Ttoken")
      .put(`tutor/videos-private-public?id=${id}`)
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
        // setToastMessage(res.data.message);
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
    axiosInstance("Ttoken")
      .delete(`tutor/delete-videos?id=${id}`)
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
        // setToastMessage(res.data.message);
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
    <>
      {videos.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}
      <div className="flex justify-center">
        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {filteredData.length > 0 ? (
              filteredData.map((video, index) => (
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
                      {video.rejected ? <Text>Status : Rejected</Text> : null}
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
          <div>
            <p className="text-xl text-white font-bold text-center">
              You have not yet uploaded any videos
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
    </>
  );
};
