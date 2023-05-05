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
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";

const FavouriteVideos = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();
  const [favouriteVideos, setFavouriteVideos] = useState([]);
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


  const videos = favouriteVideos.filter(
    (videos) => videos.video.listed == true
  );

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? videos.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.video.video_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedSubject === "" ||
              selectedSubject.toLowerCase() === item.subject.toLowerCase())
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
      .get(`favourite-videos?id=${student._id}`)
      .then((response) => {
        setFavouriteVideos(response.data);
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
      .put(`remove-favourite-video/${id}`)
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
      {videos.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}
      <div className="flex justify-center">
        {videos.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-1">
            {filteredData.length > 0 ? (
              filteredData.map((videos, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody>
                    <iframe
                      title="PDF Viewer"
                      src={videos.video.video_link}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" className="uppercase">
                        {" "}
                        {videos.video.video_name}
                      </Heading>
                      <Text className="uppercase">
                        Class : {videos.branch} <br />
                        Subject : {videos.subject}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2" className="mx-auto">
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
                              Remove Video from favourites
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
                                onClick={() => handleRemove(videos._id)}
                                ml={3}
                              >
                                Remove
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
              Nothing in favourite videos
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

export default FavouriteVideos;
