import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const UploadQuestionPapers = lazy(()=>import("../../components/Student/Upload/UploadQuestionPapers"))

const UploadQuestionPapersPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="288px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <UploadQuestionPapers />
      </Suspense>
    </>
  );
};

export default UploadQuestionPapersPage;
