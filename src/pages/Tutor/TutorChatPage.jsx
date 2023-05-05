import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const TutorChat = lazy(()=>import("../../components/Tutor/Chat/TutorChat"))

const TutorChatPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <TutorChat />
      </Suspense>
    </>
  );
   ;
};

export default TutorChatPage;
