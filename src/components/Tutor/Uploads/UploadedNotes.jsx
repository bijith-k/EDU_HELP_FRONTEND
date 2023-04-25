 
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
import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const UploadedNotes = () => {
  const tutor = useSelector((state) => state.tutor);
  console.log(tutor, "tutor");
  const toast = useToast()
  const token = localStorage.getItem("Ttoken")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [notes, setNotes] = useState([]);
  // const[change,setChange] = useState('')
   
  const [change, setChange] = useState("");

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");
    console.log(tutor._id, "iddd");
    axios
      .get(`tutor/uploaded-notes?id=${Tid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "sfasdfsdf");
        setNotes(response.data);
      });
  }, [change]);


  const handlePrivate = (id) => {
    axios
      .put(`tutor/notes-private-public?id=${id}`,null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setToastMessage(res.data.message);
        
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
    axios
      .delete(`tutor/delete-notes?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
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
        notes.map((note, index) => (
          // <div className="py-5 max-w-xs" key={index}>
          //   <div className="rounded-xl bg-gray-200 hover:shadow-xl hover:shadow-gray-500 overflow-hidden shadow-lg  p-2">
          //     {/* <img
          //     src="https://www.pexels.com/photo/black-nikon-dslr-camera-on-white-book-9222655/"
          //     alt="img"
          //     className=""
          //   /> */}
          //     <iframe
          //       title="PDF Viewer"
          //       src={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
          //       height="240"
          //       scrolling="no"
          //       className="rounded-xl border border-yellow-600"
          //     />
          //     <div className="px-6 py-4">
          //       <div className="font-bold text-xl mb-2 uppercase">
          //         {note.note_name}
          //       </div>
          //       <p className="text-gray-500 uppercase ">
          //         CLASS : {note.branch.name}
          //       </p>
          //       <p className="text-gray-500 uppercase">
          //         Subject : {note.subject.name}
          //       </p>
          //       {note.approved ? (
          //         <p className="text-gray-500 uppercase">Status : Approved</p>
          //       ) : (
          //         <p className="text-gray-500 uppercase">
          //           Status : Pending Admin approval
          //         </p>
          //       )}
          //     </div>
          //     <div className="grid grid-flow-col gap-5 pb-2 px-6">
          //       <span className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
          //         <a
          //           href={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
          //           target="_blank"
          //         >
          //           VIEW
          //         </a>
          //       </span>
          // {note.private ? (
          //   <span
          //     className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
          //     onClick={() => handlePrivate(note._id)}
          //   >
          //     MAKE PUBLIC
          //   </span>
          // ) : (
          //   <span
          //     className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
          //     onClick={() => handlePrivate(note._id)}
          //   >
          //     MAKE PRIVATE
          //   </span>
          // )}
          // <span
          //   className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
          //   onClick={() => handleDelete(note._id)}
          // >
          //   DELETE
          // </span>

          //       {/* <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
          //       download
          //     </span> */}
          //     </div>
          //   </div>
          // </div>
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
                ) : (
                  <Text>Status : Pending Admin approval</Text>
                )}

                {note.rejected ? <Text>Status : Rejected</Text> : null}
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
                    href={`${import.meta.env.VITE_BASE_PATH}${note.file_path}`}
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
                        Are you sure? You can't undo this action afterwards.
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
        <div>
          <p className="text-xl text-white font-bold text-center">
            You have not yet uploaded any notes
          </p>
        </div>
      )}
    </>
  );
};

export default UploadedNotes;
