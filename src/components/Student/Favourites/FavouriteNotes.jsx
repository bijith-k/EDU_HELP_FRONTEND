import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
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
import Search from "../Search/Search";
import Pagination from "../../Pagination/Pagination";

const FavouriteNotes = () => {
  const { student } = useSelector((state) => state.student);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [favouriteNotes, setFavouriteNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [change, setChange] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage, setNotesPerPage] = useState(4);
    const lastNoteIndex = currentPage * notesPerPage;
    const firstNoteIndex = lastNoteIndex - notesPerPage;

    const handleSearchQuery = (data) => {
      setSearchQuery(data);
    };

    const handleSelectedSubject = (data) => {
      setSelectedSubject(data);
    };

  const note = favouriteNotes.filter((notes) => notes.note.listed == true);

  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? note.filter((item) => {
          return (
            (searchQuery.trim() === "" ||
              item.note.note_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedSubject === "" ||
              selectedSubject.toLowerCase() === item.subject.toLowerCase())
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
      .get(`favourite-notes?id=${student._id}`)
      .then((response) => {
        setFavouriteNotes(response.data);
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
      .put(`remove-favourite-note/${id}`)
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
      {note.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}
      <div className="flex justify-center">
        {note.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-1">
            {currentNotes.length > 0 ? (
              currentNotes.map((notes, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody>
                    <iframe
                      title="PDF Viewer"
                      src={`${import.meta.env.VITE_BASE_PATH}${
                        notes.note.file_path
                      }`}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" className="uppercase">
                        {" "}
                        {notes.note.note_name}
                      </Heading>
                      <Text className="uppercase">
                        Class : {notes.branch} <br />
                        Subject : {notes.subject}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button className="bg-red-100 p-3 rounded-lg">
                        <a
                          href={`${import.meta.env.VITE_BASE_PATH}${
                            notes.note.file_path
                          }`}
                          target="_blank"
                        >
                          VIEW
                        </a>
                      </Button>

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
                              Remove from favourite
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
                                onClick={() => handleRemove(notes._id)}
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
          <div>
            <p className="text-center font-bold text-lg">
              Nothing in favourite notes
            </p>
          </div>
        )}
      </div>
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

export default FavouriteNotes;
