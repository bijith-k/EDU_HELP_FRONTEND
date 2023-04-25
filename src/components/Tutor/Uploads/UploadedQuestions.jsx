import {
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UploadedQuestions = () => {
  const tutor = useSelector((state) => state.tutor);
  console.log(tutor, "tutorqq");
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [questions, setQuestions] = useState([]);
  const [change, setChange] = useState("");
  console.log(questions, "qqq");

  const token = localStorage.getItem("Ttoken");

  useEffect(() => {
    const Tid = localStorage.getItem("Tid");

    axios
      .get(
        `tutor/uploaded-questions?id=${Tid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("afasdfsdds");
        console.log(response.data, "sfasdfsdf");
        setQuestions(response.data);
      });
  }, [change]);

   const handlePrivate = (id) => {
     axios
       .put(`tutor/questions-private-public?id=${id}`, null, {
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
       .delete(`tutor/delete-questions?id=${id}`, {
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
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div className="py-5 max-w-xs" key={index}>
            <div className="rounded-xl bg-gray-200 hover:shadow-xl hover:shadow-gray-500 overflow-hidden shadow-lg  p-2">
              {/* <img
        src="https://www.pexels.com/photo/black-nikon-dslr-camera-on-white-book-9222655/"
        alt="img"
        className=""
      /> */}
              <iframe
                title="PDF Viewer"
                src={`${import.meta.env.VITE_BASE_PATH}${question.file_path}`}
                height="240"
                scrolling="no"
                className="rounded-xl border border-yellow-600"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">
                  {question.exam_name}
                </div>
                <p className="text-gray-500 uppercase ">
                  CLASS : {question.branch.name}
                </p>
                <p className="text-gray-500 uppercase">
                  Subject : {question.subject.name}
                </p>
                {question.approved ? (
                  <p className="text-gray-500 uppercase">Status : Approved</p>
                ) : (
                  <p className="text-gray-500 uppercase">
                    Status : Pending Admin approval
                  </p>
                )}
                {question.rejected ? (
                  <p className="text-gray-500 uppercase">Status : Rejected</p>
                ) : null}
              </div>
              <div className="grid grid-flow-col gap-5 pb-2 px-6">
                <span className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
                  <a
                    href={`${import.meta.env.VITE_BASE_PATH}${
                      question.file_path
                    }`}
                    target="_blank"
                  >
                    VIEW
                  </a>
                </span>
                {question.private ? (
                  <span
                    className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
                    onClick={() => handlePrivate(question._id)}
                  >
                    MAKE PUBLIC
                  </span>
                ) : (
                  <span
                    className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
                    onClick={() => handlePrivate(question._id)}
                  >
                    MAKE PRIVATE
                  </span>
                )}
                <span
                  className="bg-gray-600 text-white  rounded-full px-3 py-1 text-sm font-base mb-2 text-center"
                  onClick={onOpen}
                >
                  DELETE
                </span>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Question Paper
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
                          onClick={() => handleDelete(question._id)}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                {/* <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2 text-center">
          download
        </span> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-xl text-white font-bold text-center">
            You have not yet uploaded any question papers
          </p>
        </div>
      )}
    </>
  );
};

export default UploadedQuestions;
