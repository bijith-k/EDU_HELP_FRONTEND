import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const ManageQuestionPaper = lazy(()=>import("../../components/Admin/QuestionPaper/ManageQuestionPaper"))

const ManageQuestionPapersPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <ManageQuestionPaper />
      </Suspense>
    </>
  );
};

export default ManageQuestionPapersPage;
