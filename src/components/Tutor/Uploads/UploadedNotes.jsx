import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  Heading,
  SimpleGrid,
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
import Pagination from "../../Pagination/Pagination";
import Search from "../Search/Search";

const UploadedNotes = () => {
  const { tutor } = useSelector((state) => state.tutor);

  const toast = useToast();
  const token = localStorage.getItem("Ttoken");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [notes, setNotes] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedSubject, setSelectedSubject] = useState("");
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

  const [change, setChange] = useState("");

  

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");

    axiosInstance("Ttoken")
      .get(`tutor/uploaded-notes?id=${Tid}`)
      .then((response) => {
        setNotes(response.data);
      });
  }, [change]);

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
       if (searchQuery != "" || selectedSubject != "") {
         currentNotes = filteredData;
       } else {
         currentNotes = filteredData.slice(firstNoteIndex, lastNoteIndex);
       }




  const handlePrivate = (id) => {
    axiosInstance("Ttoken")
      .put(`tutor/notes-private-public?id=${id}`)
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
      .delete(`tutor/delete-notes?id=${id}`)
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
                  <CardBody>
                    {/* <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                /> */}
                    <iframe
                      title="PDF Viewer"
                      src={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
                      height="240"
                      scrolling="no"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md"> {note.note_name}</Heading>
                      <Text>
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
                      {/* <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button> */}
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
                      {/* <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button> */}
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
              <p className=" text-white ">
                No results found for "{searchQuery}" and "{selectedSubject}"
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-xl text-white font-bold text-center">
              You have not yet uploaded any notes
            </p>
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
    </>
  );
};

export default UploadedNotes;
