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
  useToast,
} from "@chakra-ui/react";
import Pagination from "../../Pagination/Pagination";
import exclusive from "../../../assets/exclusive (1).png";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";


const VideosContent = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();
  const [videos, setVideos] = useState([]);
  const [subjects, setSubjects] = useState([]);
const navigate = useNavigate()
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
 

  const video = videos.filter(
    (video) => video.branch._id === student.branch._id
  );


  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? video.filter((item) => {
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
      : video;

      let currentVideos;
      if (searchQuery != "" || selectedSubject != "") {
        currentVideos = filteredData;
      } else {
        currentVideos = filteredData.slice(firstVideoIndex, lastVideoIndex);
      }




  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-videos?studentId=${student._id}`)
      .then((response) => {
        if (response.data.status == false) {
           
          localStorage.removeItem("Stoken");
          navigate("/signin");
        } else {
          setVideos(response.data);
           
        }
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
      .get(`add-favourite-video/${id}`)
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
        } else if (res.data.status == false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.removeItem("Stoken");
          navigate("/signin");
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
      {video.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}

      <div className="flex justify-center">
        {video.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentVideos.length > 0 ? (
              currentVideos.map((video, index) => (
                <Card
                  maxW="sm"
                  key={index}
                  className={`relative ${
                    video.exclusive ? "shadow-2xl  border-y-4" : null
                  } `}
                >
                  {video.exclusive ? (
                    <div class="absolute z-50 bottom-40 right-14 -mt-3 -mr-3  w-10 h-10">
                      <img src={exclusive} alt="" />
                    </div>
                  ) : null}
                  <CardBody className="flex flex-col">
                    <iframe
                      title="Video frame"
                      src={video.video_link}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                      className="m-0"
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
                      {/* <Text color="blue.600" fontSize="2xl">
                      $450
                    </Text> */}
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
                        DOWNLOAD
                      </a>
                    </Button> */}
                      {/* <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button> */}
                      <Button
                        className="bg-rose-100 p-3 rounded-lg"
                        onClick={() => handleFavourite(video._id)}
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
          <div className="h-40">
            {" "}
            <p className="text-center font-bold text-lg">
              No videos are there to display
            </p>
          </div>
        )}
      </div>

      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={video.length}
          contentsPerPage={videosPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default VideosContent;
