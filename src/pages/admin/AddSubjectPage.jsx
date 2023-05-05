import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const AddSubject = lazy(()=>import("../../components/Admin/Subject/AddSubject"))

const AddSubjectPage = () => {
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
        <AddSubject />
      </Suspense>
    </>
  );
};

export default AddSubjectPage;
