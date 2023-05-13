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
  Box,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import exclusive from "../../../assets/exclusive (1).png";

import { useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";
import axiosInstance from "../../../axios";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import NotesSkeleton from "../../NotesSkeleton/NotesSkeleton";

const NotesContent = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(4);
  const lastNoteIndex = currentPage * notesPerPage;
  const firstNoteIndex = lastNoteIndex - notesPerPage;
  const [loading, setLoading] = useState(true);
  

  const handleSearchQuery = (data) => {
    setSearchQuery(data);
  };

  const handleSelectedSubject = (data) => {
    setSelectedSubject(data);
  };

  const note = notes.filter((note) => note.branch._id === student.branch._id);

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? note.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.note_name
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
      : note;

  let currentNotes;
  if (searchQuery != "" || selectedSubject != "") {
    currentNotes = filteredData;
  } else {
    currentNotes = filteredData.slice(firstNoteIndex, lastNoteIndex);
  }

  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-notes?studentId=${true}`)
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
          setNotes(response.data);
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
         
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  }, []);

  const handleFavourite = (id) => {
    axiosInstance("Stoken")
      .get(`add-favourite-note/${id}`)
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
      {note.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}
      {loading ? (
        <NotesSkeleton />
      ) : (
        <div className="flex justify-center">
          {note.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
              {currentNotes.length > 0 ? (
                currentNotes.map((note, index) => (
                  <Card
                    maxW="sm"
                    key={index}
                    className={`relative ${
                      note.exclusive ? "shadow-2xl  border-y-4" : null
                    } `}
                  >
                    {note.exclusive ? (
                      <div class="absolute z-50 bottom-40 right-14 -mt-3 -mr-3  w-10 h-10">
                        <img src={exclusive} alt="" />
                      </div>
                    ) : null}
                    <CardBody className="flex flex-col">
                      <iframe
                        title="PDF Viewer"
                        src={`${import.meta.env.VITE_BASE_PATH}${
                          note.file_path
                        }`}
                        height="240"
                        scrolling="no"
                        borderRadius="lg"
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="md" className="uppercase">
                          {" "}
                          {note.note_name}
                        </Heading>
                        <Text className="uppercase">
                          Class : {note.branch.name} <br />
                          Subject : {note.subject.name}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button className="bg-red-100 p-3 rounded-lg">
                          <a
                            href={`${import.meta.env.VITE_BASE_PATH}${
                              note.file_path
                            }`}
                            target="_blank"
                          >
                            DOWNLOAD
                          </a>
                        </Button>

                        <Button
                          className="bg-rose-100 p-3 rounded-lg"
                          onClick={() => handleFavourite(note._id)}
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
              <p className="text-center font-bold text-lg">
                No notes are there to display
              </p>{" "}
            </div>
          )}
        </div>
      )}
      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={note.length}
          contentsPerPage={notesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default NotesContent;
