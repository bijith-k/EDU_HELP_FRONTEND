import { Skeleton, Stack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
const Uploads = lazy(()=>import("../../components/Tutor/Uploads/Uploads"))

const UploadsPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Stack className="max-w-screen-2xl mx-auto min-h-screen">
            <Skeleton height="80px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton className="h-screen" />
          </Stack>
        }
      >
        <Uploads />
      </Suspense>
    </>
  );
};

export default UploadsPage;
