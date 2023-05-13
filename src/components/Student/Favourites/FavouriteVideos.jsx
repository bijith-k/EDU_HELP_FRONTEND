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
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import NotesSkeleton from "../../NotesSkeleton/NotesSkeleton";

const FavouriteVideos = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [favouriteVideos, setFavouriteVideos] = useState([]);

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
  const [removeVideoId, setRemoveVideoId] = useState(null);


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
      .get(`favourite-videos`)
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
          setFavouriteVideos(response.data);
          setLoading(false);

        }
      })
      .catch((err) => {
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

  const handleRemove = (id) => {
    onClose();
    axiosInstance("Stoken")
      .put(`remove-favourite-video/${id}`)
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
      {loading ? (
        <NotesSkeleton />
      ) : (
        <div className="flex justify-center">
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-1">
              {currentVideos.length > 0 ? (
                currentVideos.map((videos, index) => (
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
                          className="bg-red-500 text-white p-3 rounded-lg"
                          onClick={() => {
                            setRemoveVideoId(videos._id);
                            onOpen();
                          }}
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
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
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
                                  onClick={() => handleRemove(removeVideoId)}
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

export default FavouriteVideos;
