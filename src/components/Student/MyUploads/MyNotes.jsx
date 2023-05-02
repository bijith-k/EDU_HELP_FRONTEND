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
import Pagination from "../../Pagination/Pagination";
import Search from "../Search/Search";

const MyNotes = () => {
  const { student } = useSelector((state) => state.student);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [change, setChange] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [notesPerPage, setNotesPerPage] = useState(4);
   const lastNoteIndex = currentPage * notesPerPage;
   const firstNoteIndex = lastNoteIndex - notesPerPage;


    

    const handleSearchQuery = (data) => {
      setSearchQuery(data)
    }

    const handleSelectedSubject = (data) => {
      setSelectedSubject(data)
    }

     
  const filteredData =
    searchQuery.trim() !== "" || selectedSubject !== ""
      ? notes.filter((item) => {
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
      : notes;

      let currentNotes;
      if(searchQuery != "" || selectedSubject != ""){
       currentNotes = filteredData
      }else{
       currentNotes = filteredData.slice(firstNoteIndex, lastNoteIndex);
      }


  useEffect(() => {
    axiosInstance("Stoken")
      .get(`get-notes?id=${student._id}`)
      .then((response) => {
        setNotes(response.data);
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
      .put(`notes-private-public?id=${id}`)
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
      .delete(`delete-notes?id=${id}`)
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
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <div>
      {notes.length > 0 ? (
        <Search
          searchQueryData={handleSearchQuery}
          selectedSubjectData={handleSelectedSubject}
        />
      ) : null}

      <div className="flex justify-center">
        {notes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentNotes.length > 0 ? (
              currentNotes.map((note, index) => (
                <Card maxW="sm" key={index}>
                  <CardBody className="flex flex-col">
                    <iframe
                      title="PDF Viewer"
                      src={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
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

                      {note.approved ? (
                        <Text>Status : Approved</Text>
                      ) : note.rejected ? (
                        <>
                          <Text>Status : Rejected</Text>
                          <Text>Reason : {note.rejection_reason}</Text>
                        </>
                      ) : (
                        <Text>Status : Pending Admin approval</Text>
                      )}
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
                          VIEW
                        </a>
                      </Button>

                      {note.private ? (
                        <Button
                          // size="medium"
                          className="bg-red-100 p-3 rounded-lg"
                          onClick={() => handlePrivate(note._id)}
                        >
                          MAKE PUBLIC
                        </Button>
                      ) : (
                        <Button
                          // size="medium"
                          className="bg-red-100 p-3 rounded-lg"
                          onClick={() => handlePrivate(note._id)}
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
                              Delete Note
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
                                onClick={() => handleDelete(note._id)}
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
            <p className="text-center font-bold text-lg">You haven't uploaded any notes</p>
          </div>
        )}
      </div>

      {searchQuery != "" || selectedSubject != "" ? null : (
        <Pagination
          totalContents={notes.length}
          contentsPerPage={notesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default MyNotes;
