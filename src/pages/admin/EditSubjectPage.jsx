import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const EditSubject = lazy(()=>import("../../components/Admin/Subject/EditSubject"))

const EditSubjectPage = () => {
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
        <EditSubject />
      </Suspense>
    </>
  );
};

export default EditSubjectPage;
